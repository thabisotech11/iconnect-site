import type { Metadata } from "next";
import Link from "next/link";
import { LayoutDashboard, Package, ClipboardList, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ClipboardList },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface">
      <div className="flex">
        <aside className="hidden w-64 shrink-0 border-r border-line bg-canvas p-5 lg:block">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-ink">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
              style={{ background: "linear-gradient(135deg, #2E6BFF 0%, #0A2FA8 100%)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C7 2 3 5.6 3 10c0 3.2 2 5.9 5 7.2V22l4.2-2.7c5-.3 8.8-4 8.8-8.5C21 6 17 2 12 2Z" fill="currentColor" />
              </svg>
            </span>
            iConnect Admin
          </Link>

          <nav className="mt-8 space-y-1" aria-label="Admin">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink"
              >
                <item.icon size={16} aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/"
            className="mt-8 flex items-center gap-2 border-t border-line pt-5 text-xs font-medium text-ink-faint hover:text-ink"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Back to storefront
          </Link>
        </aside>

        <main className="min-w-0 flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
