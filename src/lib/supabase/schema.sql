-- ─────────────────────────────────────────────────────────────
-- iConnect Pre-Owned — Supabase schema
-- Run in the Supabase SQL editor (or via `supabase db push`).
-- Mirrors the TypeScript types in src/lib/types.ts so swapping
-- src/lib/mock-data.ts for real queries is a drop-in change.
-- ─────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ── Profiles (extends Supabase auth.users) ─────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name) values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── Products ────────────────────────────────────────────────
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  brand text not null check (brand in ('Apple', 'Samsung')),
  category text not null check (
    category in ('iPhone', 'Samsung Galaxy', 'iPad', 'Apple Watch', 'AirPods', 'MacBook', 'Accessories')
  ),
  tagline text,
  description text,
  price numeric(10, 2) not null,
  compare_at_price numeric(10, 2),
  condition text not null check (condition in ('Pristine', 'Excellent', 'Good', 'Fair')),
  battery_health smallint,
  storage_options text[],
  color_options text[],
  stock_quantity integer not null default 0,
  specs jsonb not null default '[]',
  accessories_included text[],
  warranty_days integer not null default 30,
  is_featured boolean not null default false,
  is_new_arrival boolean not null default false,
  gradient text,
  created_at timestamptz not null default now()
);

create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (is_featured) where is_featured;

alter table public.products enable row level security;
create policy "Products are publicly readable" on public.products for select using (true);
-- Writes are intentionally NOT open to anon/authenticated — use the
-- service-role client (src/lib/supabase/server.ts) from admin routes only.

-- ── Reviews ─────────────────────────────────────────────────
create table if not exists public.reviews (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products (id) on delete cascade,
  user_id uuid references auth.users (id) on delete set null,
  author text not null,
  location text,
  rating smallint not null check (rating between 1 and 5),
  title text,
  body text,
  verified_purchase boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.reviews enable row level security;
create policy "Reviews are publicly readable" on public.reviews for select using (true);
create policy "Authenticated users can add reviews" on public.reviews
  for insert with check (auth.uid() = user_id);

-- ── Orders ──────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  reference text unique not null,
  user_id uuid references auth.users (id) on delete set null,
  status text not null default 'Processing'
    check (status in ('Processing', 'Quality Check', 'Dispatched', 'Out for Delivery', 'Delivered', 'Cancelled')),
  total numeric(10, 2) not null,
  shipping_address jsonb not null,
  payment_provider text check (payment_provider in ('payfast', 'stripe')),
  payment_reference text,
  courier_tracking_number text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders (id) on delete cascade,
  product_id uuid references public.products (id),
  name text not null,
  price numeric(10, 2) not null,
  quantity integer not null default 1,
  storage text,
  color text
);

alter table public.orders enable row level security;
alter table public.order_items enable row level security;

create policy "Users can view their own orders" on public.orders
  for select using (auth.uid() = user_id);
create policy "Users can view their own order items" on public.order_items
  for select using (exists (select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- ── Wishlists ───────────────────────────────────────────────
create table if not exists public.wishlists (
  user_id uuid references auth.users (id) on delete cascade,
  product_id uuid references public.products (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

alter table public.wishlists enable row level security;
create policy "Users manage their own wishlist" on public.wishlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Trade-in / Sell requests ────────────────────────────────
create table if not exists public.device_quote_requests (
  id uuid primary key default uuid_generate_v4(),
  goal text not null check (goal in ('trade-in', 'sell')),
  category text not null,
  model text not null,
  answers jsonb not null default '[]',
  estimated_value numeric(10, 2) not null,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  notes text,
  status text not null default 'Pending Review'
    check (status in ('Pending Review', 'Approved', 'Received', 'Paid Out', 'Rejected')),
  created_at timestamptz not null default now()
);

alter table public.device_quote_requests enable row level security;
create policy "Anyone can submit a quote request" on public.device_quote_requests
  for insert with check (true);

-- ── Repair bookings ─────────────────────────────────────────
create table if not exists public.repair_bookings (
  id uuid primary key default uuid_generate_v4(),
  device text not null,
  issue text not null,
  preferred_date date,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  status text not null default 'Requested'
    check (status in ('Requested', 'Confirmed', 'In Progress', 'Completed', 'Cancelled')),
  created_at timestamptz not null default now()
);

alter table public.repair_bookings enable row level security;
create policy "Anyone can submit a repair booking" on public.repair_bookings
  for insert with check (true);

-- ── Financing applications ──────────────────────────────────
create table if not exists public.financing_applications (
  id uuid primary key default uuid_generate_v4(),
  applicant_name text not null,
  applicant_email text not null,
  amount numeric(10, 2) not null,
  months integer not null,
  status text not null default 'Pending' check (status in ('Pending', 'Approved', 'Declined')),
  created_at timestamptz not null default now()
);

alter table public.financing_applications enable row level security;
create policy "Anyone can submit a financing application" on public.financing_applications
  for insert with check (true);

-- ── Newsletter ──────────────────────────────────────────────
create table if not exists public.newsletter_subscribers (
  email text primary key,
  subscribed_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
create policy "Anyone can subscribe" on public.newsletter_subscribers
  for insert with check (true);

-- ── Contact messages ────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  topic text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
create policy "Anyone can send a contact message" on public.contact_messages
  for insert with check (true);
