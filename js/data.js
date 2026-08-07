/* ─────────────────────────────────────────────────────────────
   iConnect Pre-Owned — shared data & helpers
   Loaded on every page before main.js and any page-specific script.
   ───────────────────────────────────────────────────────────── */

// ── Icon + gradient system (one signature look per category) ──
const DEVICE_ICONS = {
  phone:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  tablet:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M11 18h2"/></svg>',
  watch:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><rect x="7" y="6" width="10" height="12" rx="3"/><path d="M9 3h6M9 21h6"/></svg>',
  headphones:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-8h3ZM3 19a2 2 0 0 0 2 2h1v-8H3Z"/></svg>',
  laptop:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M2 19h20"/></svg>',
  cable:'<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".9"><path d="M4 9a3 3 0 0 0 3 3h1a3 3 0 0 1 3 3v1a3 3 0 0 0 3 3"/><path d="M14 4l6 6M4 14l6 6"/><circle cx="6" cy="6" r="2.2"/><circle cx="18" cy="18" r="2.2"/></svg>'
};
const CATEGORY_META = {
  'iPhone':        { icon:'phone',      gradient:'linear-gradient(135deg,#2E6BFF,#0A2FA8)', ring:'#2E6BFF' },
  'Samsung Galaxy':{ icon:'phone',      gradient:'linear-gradient(135deg,#6C5CE7,#2E1F8F)', ring:'#6C5CE7' },
  'iPad':          { icon:'tablet',     gradient:'linear-gradient(135deg,#17A5C7,#0A5570)', ring:'#17A5C7' },
  'Apple Watch':   { icon:'watch',      gradient:'linear-gradient(135deg,#FF6B6B,#B7325C)', ring:'#FF6B6B' },
  'AirPods':       { icon:'headphones', gradient:'linear-gradient(135deg,#B8BEC8,#5B6270)', ring:'#8B93A1' },
  'MacBook':       { icon:'laptop',     gradient:'linear-gradient(135deg,#4B5563,#111827)', ring:'#4B5563' },
  'Accessories':   { icon:'cable',      gradient:'linear-gradient(135deg,#34D399,#047857)', ring:'#34D399' },
};
const CATEGORIES = Object.keys(CATEGORY_META);
const CONDITION_TONE = { Pristine:'badge-accent', Excellent:'badge-positive', Good:'badge-accent', Fair:'badge-caution' };
const CONDITION_INFO = {
  Pristine:{ headline:'Looks brand new', description:'No visible wear under close inspection. Full original-feel finish.' },
  Excellent:{ headline:'Barely-there wear', description:'Minor signs of use visible only in direct light. Feels like new in hand.' },
  Good:{ headline:'Light, visible wear', description:"Noticeable light scuffs or marks that don't affect performance." },
  Fair:{ headline:'Great value', description:'Clearly used with visible wear. Fully functional and thoroughly tested.' },
};

// ── Helpers ─────────────────────────────────────────────────
function fmtZAR(n){ return 'R' + Math.round(n).toLocaleString('en-ZA'); }
function slugify(s){ return s.toLowerCase().trim().replace(/[^\w\s-]/g,'').replace(/[\s_-]+/g,'-'); }
function initials(name){ return name.split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
function starsHTML(rating, size){
  size = size || 12;
  let s = '';
  for(let i=1;i<=5;i++){
    s += i <= Math.round(rating)
      ? `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="#FF9500" stroke="#FF9500"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>`
      : `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="rgb(232,232,237)" stroke="rgb(232,232,237)"><polygon points="12 2 15 9 22 9.5 17 14.5 18.5 22 12 18 5.5 22 7 14.5 2 9.5 9 9"/></svg>`;
  }
  return s;
}
function deviceIcon(category, size){
  size = size || 22;
  const meta = CATEGORY_META[category];
  return `<span style="display:inline-flex; width:${size}px; height:${size}px; color:rgb(var(--ink-soft));">${DEVICE_ICONS[meta.icon].replace(/#fff/g,'currentColor')}</span>`;
}

// ── Product catalogue (mirrors the Next.js version's mock-data.ts) ──
const PRODUCTS = [
  { name:'iPhone 15 Pro Max', brand:'Apple', category:'iPhone', tagline:'Titanium. So strong. So light. So Pro.',
    description:'The iPhone 15 Pro Max in a titanium design, with the A17 Pro chip and the most advanced Pro camera system yet. Every unit is data-wiped, functionally tested on 60+ points, and graded honestly.',
    price:24999, was:29999, condition:'Pristine', battery:96, storage:['256GB','512GB'], colors:['Natural Titanium','Blue Titanium','Black Titanium'],
    stock:6, rating:4.9, reviews:34, featured:true,
    specs:[['Display','6.7" Super Retina XDR, ProMotion'],['Chip','A17 Pro'],['Camera','48MP main + 12MP ultra-wide + 12MP telephoto'],['Battery health','96% of original capacity']],
    included:['USB-C cable','SIM eject tool','iConnect certified box & documentation'] },
  { name:'iPhone 15 Pro', brand:'Apple', category:'iPhone', tagline:'Pro. Beyond.',
    description:'A serious camera system in a seriously refined titanium frame. Tested and certified with full battery diagnostics before it ever reaches you.',
    price:19999, was:23999, condition:'Excellent', battery:94, storage:['128GB','256GB'], colors:['Natural Titanium','White Titanium'],
    stock:9, rating:4.8, reviews:51,
    specs:[['Display','6.1" Super Retina XDR, ProMotion'],['Chip','A17 Pro'],['Camera','48MP main + 12MP ultra-wide + 12MP telephoto'],['Battery health','94% of original capacity']],
    included:['USB-C cable','SIM eject tool','iConnect certified box & documentation'] },
  { name:'iPhone 15', brand:'Apple', category:'iPhone', tagline:'Newphoria.',
    description:'Dynamic Island, a 48MP main camera and USB-C, in a colour-infused glass and aluminium design. Fully certified and ready to go.',
    price:15999, was:18999, condition:'Excellent', battery:95, storage:['128GB','256GB'], colors:['Pink','Black','Blue'],
    stock:11, rating:4.8, reviews:29, newArrival:true,
    specs:[['Display','6.1" Super Retina XDR'],['Chip','A16 Bionic'],['Camera','48MP main + 12MP ultra-wide'],['Battery health','95% of original capacity']],
    included:['USB-C cable','SIM eject tool','iConnect certified box & documentation'] },
  { name:'iPhone 14 Pro', brand:'Apple', category:'iPhone', tagline:'Dynamic Island. Always-On display.',
    description:"The Pro camera system and Dynamic Island, in great condition and backed by our 30-day warranty. A light mark on the frame keeps this one great value.",
    price:16499, was:19999, condition:'Good', battery:89, storage:['128GB','256GB'], colors:['Space Black','Deep Purple'],
    stock:5, rating:4.7, reviews:22,
    specs:[['Display','6.1" Super Retina XDR, ProMotion'],['Chip','A16 Bionic'],['Camera','48MP main + 12MP ultra-wide + 12MP telephoto'],['Battery health','89% of original capacity']],
    included:['USB-C to Lightning cable','SIM eject tool','iConnect certified box & documentation'] },
  { name:'iPhone 14', brand:'Apple', category:'iPhone', tagline:'A total powerhouse.',
    description:'Reliable, fast, and certified with our full 60-point inspection. A dependable daily driver at a genuinely fair price.',
    price:12999, was:15499, condition:'Excellent', battery:91, storage:['128GB','256GB'], colors:['Midnight','Starlight','Blue'],
    stock:14, rating:4.7, reviews:63, featured:true,
    specs:[['Display','6.1" Super Retina XDR'],['Chip','A15 Bionic'],['Camera','12MP main + 12MP ultra-wide'],['Battery health','91% of original capacity']],
    included:['USB-C to Lightning cable','SIM eject tool','iConnect certified box & documentation'] },
  { name:'iPhone 13', brand:'Apple', category:'iPhone', tagline:'Still a fan favourite.',
    description:'One of the most reliable iPhones ever made, now at a genuinely accessible price. Light wear on the housing, tested end to end.',
    price:9499, was:11999, condition:'Good', battery:87, storage:['128GB'], colors:['Midnight','Pink','Blue'],
    stock:17, rating:4.6, reviews:88,
    specs:[['Display','6.1" Super Retina XDR'],['Chip','A15 Bionic'],['Camera','12MP main + 12MP ultra-wide'],['Battery health','87% of original capacity']],
    included:['USB-C to Lightning cable','SIM eject tool','iConnect certified box & documentation'] },
  { name:'iPhone SE (3rd Gen)', brand:'Apple', category:'iPhone', tagline:'Small size. Big power. Best value.',
    description:'Compact, capable, and our most affordable certified iPhone. Great as a first phone or a reliable spare.',
    price:5999, was:7499, condition:'Fair', battery:84, storage:['64GB','128GB'], colors:['Midnight','Starlight','Red'],
    stock:10, rating:4.5, reviews:19,
    specs:[['Display','4.7" Retina HD'],['Chip','A15 Bionic'],['Camera','12MP main'],['Battery health','84% of original capacity']],
    included:['USB-C to Lightning cable','iConnect certified box & documentation'] },
  { name:'Samsung Galaxy S24 Ultra', brand:'Samsung', category:'Samsung Galaxy', tagline:'Galaxy AI is here.',
    description:'The S-Pen, a 200MP camera system, and a titanium frame — inspected, cleaned, and certified with a fresh factory reset.',
    price:21999, was:25999, condition:'Pristine', battery:97, storage:['256GB','512GB'], colors:['Titanium Black','Titanium Violet'],
    stock:7, rating:4.9, reviews:26, featured:true,
    specs:[['Display','6.8" Dynamic AMOLED 2X, 120Hz'],['Chip','Snapdragon 8 Gen 3'],['Camera','200MP main + 50MP periscope telephoto'],['Battery health','97% of original capacity']],
    included:['USB-C cable','S-Pen','iConnect certified box & documentation'] },
  { name:'Samsung Galaxy Z Flip 5', brand:'Samsung', category:'Samsung Galaxy', tagline:'Flex your style.',
    description:'A genuinely fun foldable with a bigger cover screen. Hinge tested for smooth, consistent fold-and-close action.',
    price:14999, was:18999, condition:'Excellent', battery:92, storage:['256GB'], colors:['Mint','Graphite'],
    stock:4, rating:4.7, reviews:15, newArrival:true,
    specs:[['Display','6.7" foldable AMOLED + 3.4" cover screen'],['Chip','Snapdragon 8 Gen 2 for Galaxy'],['Camera','12MP main + 12MP ultra-wide'],['Battery health','92% of original capacity']],
    included:['USB-C cable','iConnect certified box & documentation'] },
  { name:'Samsung Galaxy S23', brand:'Samsung', category:'Samsung Galaxy', tagline:'Epic, every day.',
    description:'A compact flagship with a superb camera. Light wear on the frame, fully functional, and backed by our warranty.',
    price:11999, was:14499, condition:'Good', battery:88, storage:['128GB','256GB'], colors:['Phantom Black','Cream'],
    stock:8, rating:4.6, reviews:33,
    specs:[['Display','6.1" Dynamic AMOLED 2X, 120Hz'],['Chip','Snapdragon 8 Gen 2 for Galaxy'],['Camera','50MP main + 12MP ultra-wide'],['Battery health','88% of original capacity']],
    included:['USB-C cable','iConnect certified box & documentation'] },
  { name:'Samsung Galaxy A54', brand:'Samsung', category:'Samsung Galaxy', tagline:'Awesome, unlocked.',
    description:'A brilliant everyday mid-ranger with a big battery and a bright, punchy display. Excellent value for a first smartphone.',
    price:6999, was:8499, condition:'Excellent', battery:93, storage:['128GB'], colors:['Awesome Graphite','Awesome Lime'],
    stock:13, rating:4.5, reviews:41,
    specs:[['Display','6.4" Super AMOLED, 120Hz'],['Chip','Exynos 1380'],['Camera','50MP main + 12MP ultra-wide'],['Battery health','93% of original capacity']],
    included:['USB-C cable','iConnect certified box & documentation'] },
  { name:'iPad Pro 12.9" (6th Gen)', brand:'Apple', category:'iPad', tagline:'Impossibly advanced.',
    description:'The M2 chip and Liquid Retina XDR display make this the most capable iPad we sell. Screen and digitiser fully tested.',
    price:18999, was:22999, condition:'Excellent', battery:95, storage:['128GB','256GB'], colors:['Space Grey','Silver'],
    stock:5, rating:4.8, reviews:18, featured:true,
    specs:[['Display','12.9" Liquid Retina XDR'],['Chip','Apple M2'],['Camera','12MP wide + 10MP ultra-wide'],['Battery health','95% of original capacity']],
    included:['USB-C cable','iConnect certified box & documentation'] },
  { name:'iPad Air (5th Gen)', brand:'Apple', category:'iPad', tagline:'Serious performance in a light package.',
    description:"The M1 chip in a slim, colourful design. A light scuff on one corner, otherwise flawless — priced accordingly.",
    price:10999, was:13499, condition:'Good', battery:90, storage:['64GB','256GB'], colors:['Blue','Starlight'],
    stock:9, rating:4.7, reviews:24,
    specs:[['Display','10.9" Liquid Retina'],['Chip','Apple M1'],['Camera','12MP wide'],['Battery health','90% of original capacity']],
    included:['USB-C cable','iConnect certified box & documentation'] },
  { name:'iPad (10th Gen)', brand:'Apple', category:'iPad', tagline:'Colourful. Capable. All-new design.',
    description:'A fresh edge-to-edge design and USB-C, perfect for study, streaming and everyday browsing.',
    price:7999, was:9999, condition:'Excellent', battery:96, storage:['64GB'], colors:['Blue','Yellow','Silver'],
    stock:12, rating:4.7, reviews:12, newArrival:true,
    specs:[['Display','10.9" Liquid Retina'],['Chip','A14 Bionic'],['Camera','12MP wide'],['Battery health','96% of original capacity']],
    included:['USB-C cable','iConnect certified box & documentation'] },
  { name:'Apple Watch Series 9', brand:'Apple', category:'Apple Watch', tagline:'Smarter. Brighter. Mightier.',
    description:'Double Tap, a brighter display, and comprehensive health tracking. Screen, crown and sensors all tested.',
    price:6999, was:8999, condition:'Excellent', battery:91, storage:['45mm GPS'], colors:['Midnight','Starlight'],
    stock:10, rating:4.8, reviews:21, featured:true,
    specs:[['Display','Always-On Retina LTPO OLED'],['Chip','S9 SiP'],['Health','ECG, blood oxygen, temperature sensing'],['Battery health','91% of original capacity']],
    included:['Magnetic charging cable','iConnect certified box & documentation'] },
  { name:'Apple Watch SE (2nd Gen)', brand:'Apple', category:'Apple Watch', tagline:'A great watch. A great price.',
    description:'All the essentials — activity tracking, notifications and fall detection — in our most affordable certified Apple Watch.',
    price:4499, was:5999, condition:'Good', battery:88, storage:['40mm GPS'], colors:['Midnight','Silver'],
    stock:15, rating:4.6, reviews:17, newArrival:true,
    specs:[['Display','Retina OLED'],['Chip','S8 SiP'],['Health','Heart rate, fall & crash detection'],['Battery health','88% of original capacity']],
    included:['Magnetic charging cable','iConnect certified box & documentation'] },
  { name:'AirPods Pro (2nd Gen)', brand:'Apple', category:'AirPods', tagline:'Next-level Active Noise Cancellation.',
    description:'Case and buds fully cleaned and sanitised, battery cycles verified, fit-tested for consistent seal and sound.',
    price:3799, was:4999, condition:'Pristine', battery:null, storage:['USB-C case'], colors:[],
    stock:20, rating:4.9, reviews:47, featured:true,
    specs:[['Noise control','Active Noise Cancellation + Transparency'],['Chip','Apple H2'],['Battery','Up to 6 hrs per charge, 30 hrs with case'],['Case','USB-C, MagSafe compatible']],
    included:['Charging case','USB-C cable','3 sizes of ear tips'] },
  { name:'AirPods Max', brand:'Apple', category:'AirPods', tagline:'Computational audio. Sky high fidelity.',
    description:'Over-ear luxury with rich, detailed audio. Ear cushions sanitised and replaced where needed; light marks on the headband.',
    price:6499, was:8999, condition:'Good', battery:null, storage:['Lightning case'], colors:['Space Grey','Silver','Sky Blue'],
    stock:6, rating:4.7, reviews:13, newArrival:true,
    specs:[['Noise control','Active Noise Cancellation + Transparency'],['Chip','Apple H1 (dual)'],['Battery','Up to 20 hrs per charge'],['Build','Stainless steel frame, knit mesh canopy']],
    included:['Smart Case','Lightning to USB-C cable'] },
  { name:'MacBook Air M2 13"', brand:'Apple', category:'MacBook', tagline:'Impressively big. Impossibly thin.',
    description:'Fanless, fast, and quiet. Full diagnostic run on battery, keyboard, trackpad, ports and display uniformity.',
    price:17999, was:21999, condition:'Excellent', battery:92, storage:['256GB','512GB'], colors:['Midnight','Starlight','Space Grey'],
    stock:4, rating:4.9, reviews:16, featured:true,
    specs:[['Display','13.6" Liquid Retina'],['Chip','Apple M2, 8-core CPU'],['Memory','8GB unified memory'],['Battery health','92% of original capacity']],
    included:['Original 30W USB-C charger & cable','iConnect certified box & documentation'] },
  { name:'MacBook Pro 14" M3', brand:'Apple', category:'MacBook', tagline:'Mind-blowing. Head-turning.',
    description:'A Liquid Retina XDR display and pro-grade performance for creative work. One of our most thoroughly tested certifications.',
    price:28999, was:34999, condition:'Pristine', battery:98, storage:['512GB','1TB'], colors:['Space Black','Silver'],
    stock:3, rating:5.0, reviews:9, newArrival:true,
    specs:[['Display','14.2" Liquid Retina XDR'],['Chip','Apple M3, 8-core CPU'],['Memory','8GB unified memory'],['Battery health','98% of original capacity']],
    included:['Original 70W USB-C charger & cable','iConnect certified box & documentation'] },
  { name:'Apple 20W USB-C Power Adapter', brand:'Apple', category:'Accessories', tagline:'Fast, compact charging.',
    description:'Genuine Apple 20W adapter, unused surplus stock, sealed for hygiene and tested for output.',
    price:399, was:549, condition:'Pristine', battery:null, storage:[], colors:[],
    stock:40, rating:4.8, reviews:62,
    specs:[['Output','20W USB-C Power Delivery'],['Compatibility','iPhone, iPad, AirPods']],
    included:['Power adapter'] },
  { name:'Apple MagSafe Charger', brand:'Apple', category:'Accessories', tagline:'Effortless wireless charging.',
    description:'Perfectly aligned magnetic wireless charging for iPhone 12 and later. Genuine Apple stock.',
    price:549, was:749, condition:'Pristine', battery:null, storage:[], colors:[],
    stock:25, rating:4.7, reviews:38, newArrival:true,
    specs:[['Output','Up to 15W wireless'],['Compatibility','iPhone 12 and later']],
    included:['MagSafe charger','USB-C cable'] },
  { name:'Genuine Leather MagSafe Case — iPhone 15', brand:'Apple', category:'Accessories', tagline:'Slim protection, premium feel.',
    description:'Soft, supple leather with perfect MagSafe alignment. New, boxed stock.',
    price:699, was:949, condition:'Pristine', battery:null, storage:[], colors:['Black','Umber','Sequoia Green'],
    stock:30, rating:4.6, reviews:27,
    specs:[['Material','Genuine leather'],['Compatibility','iPhone 15']],
    included:['Case'] },
];
// Derive a stable slug + id for every product once, up front.
PRODUCTS.forEach(p => { p.slug = slugify(p.name + ' ' + (p.storage[0] || '')); p.id = p.slug; });

function getProductBySlug(slug){ return PRODUCTS.find(p => p.slug === slug); }
function getFeatured(){ return PRODUCTS.filter(p => p.featured); }
function getNewArrivals(){ return PRODUCTS.filter(p => p.newArrival); }
function getRelated(product, limit){ return PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit || 4); }

// ── Reviews (a handful of products have write-ups) ─────────────
const REVIEWS = {
  'iphone-15-pro-max-256gb':[
    {author:'Thabo M.', loc:'Johannesburg', rating:5, title:'Genuinely looks brand new', body:"I was sceptical about buying a pre-owned Pro Max but honestly can't find a mark on it. Arrived in two days, battery health exactly as listed.", verified:true},
    {author:'Aisha K.', loc:'Cape Town', rating:5, title:'Saved thousands, zero compromise', body:'The certification report that came with it gave me total confidence. Would buy from iConnect again without hesitation.', verified:true},
  ],
  'samsung-galaxy-s24-ultra-256gb':[
    {author:'Pieter v.d. Merwe', loc:'Pretoria', rating:5, title:'S-Pen and all, flawless', body:'Screen is spotless and the S-Pen works perfectly. Delivery tracking kept me updated the whole way.', verified:true},
  ],
  'macbook-air-m2-13-256gb':[
    {author:'Naledi S.', loc:'Durban', rating:5, title:'Perfect for design work', body:"Runs Figma and Lightroom without a hiccup. Genuinely couldn't tell it wasn't new out of the box.", verified:true},
  ],
  'iphone-14-128gb':[
    {author:'Kagiso R.', loc:'Bloemfontein', rating:4, title:'Great phone, tiny mark on the back', body:"Exactly as described under 'Excellent' — one small mark you'd only notice if you were looking. Battery lasts all day.", verified:true},
  ],
  'airpods-pro-2nd-gen-usb-c-case':[
    {author:'Zanele D.', loc:'Gqeberha', rating:5, title:'Sounded brand new', body:"Noise cancelling is as strong as I remember from a friend's brand new pair. Case looked untouched.", verified:true},
  ],
};
function getReviews(productId){ return REVIEWS[productId] || []; }

// ── Testimonials (home page) ────────────────────────────────
const TESTIMONIALS = [
  {name:'Thandiwe P.', loc:'Johannesburg', rating:5, quote:'The certification report sold me. Every point they checked was listed out — battery, screen, cameras, buttons. Nothing felt hidden.', device:'iPhone 15 Pro'},
  {name:'Ryan C.', loc:'Cape Town', rating:5, quote:'Traded in my old MacBook and the quote matched what I was shown online exactly. Credited instantly against my new purchase.', device:'MacBook Air M2'},
  {name:'Nomvula K.', loc:'Durban', rating:5, quote:"Delivery was quicker than most brand-new retailers I've ordered from. Beautifully packaged too.", device:'iPad Air'},
  {name:'Werner S.', loc:'Pretoria', rating:4, quote:'Financing approval took minutes. Got my Galaxy S24 Ultra the next day without paying it off in one go.', device:'Galaxy S24 Ultra'},
  {name:'Buhle M.', loc:'Gqeberha', rating:5, quote:'Sold my old iPhone for cash the same week — the payout landed the day after they received the device.', device:'Sold: iPhone 12'},
  {name:'Chloé R.', loc:'Stellenbosch', rating:5, quote:'Screen repair on my Watch was done in under an hour while I waited. Genuinely impressive service.', device:'Apple Watch Series 8'},
];

// ── Trade-in / sell catalogue ────────────────────────────────
const TRADE_IN_CATALOG = {
  'iPhone':[ {model:'iPhone 15 Pro Max', base:14500}, {model:'iPhone 15', base:9500}, {model:'iPhone 14 Pro', base:10000}, {model:'iPhone 14', base:7500}, {model:'iPhone 13', base:5800}, {model:'iPhone 12', base:4200}, {model:'iPhone 11', base:2800}, {model:'iPhone SE (2nd/3rd Gen)', base:2000} ],
  'Samsung Galaxy':[ {model:'Galaxy S24 Ultra', base:13000}, {model:'Galaxy S23', base:7500}, {model:'Galaxy S22', base:5500}, {model:'Galaxy Z Flip 5', base:9000}, {model:'Galaxy A54', base:3500} ],
  'iPad':[ {model:'iPad Pro 12.9"', base:11000}, {model:'iPad Air', base:6500}, {model:'iPad (10th Gen)', base:4500}, {model:'iPad Mini', base:5000} ],
  'Apple Watch':[ {model:'Apple Watch Ultra', base:7500}, {model:'Apple Watch Series 9', base:4200}, {model:'Apple Watch Series 8', base:3400}, {model:'Apple Watch SE', base:2600} ],
  'AirPods':[ {model:'AirPods Max', base:3800}, {model:'AirPods Pro (2nd Gen)', base:2300}, {model:'AirPods (3rd Gen)', base:1400}, {model:'AirPods (2nd Gen)', base:900} ],
  'MacBook':[ {model:'MacBook Pro 14" M3', base:17000}, {model:'MacBook Air M2', base:11000}, {model:'MacBook Pro 13" M2', base:9500}, {model:'MacBook Air M1', base:7500} ],
};
const QUOTE_QUESTIONS = [
  { key:'screen', title:"How's the screen?", options:[
    {label:'Flawless — no scratches or cracks', deduction:0},
    {label:'Minor scratches, not visible when on', deduction:0.08},
    {label:'Visible scratches or a small crack', deduction:0.35},
  ]},
  { key:'function', title:'Does everything work properly?', options:[
    {label:'Yes — buttons, cameras, speakers, charging all work', deduction:0},
    {label:'One minor issue (e.g. camera or speaker fault)', deduction:0.15},
    {label:"Major issue — won't power on or charge", deduction:0.5},
  ]},
  { key:'battery', title:"What's the battery like?", options:[
    {label:'Great — lasts most of the day, 90%+ health', deduction:0},
    {label:'Okay — noticeably weaker, 80–89% health', deduction:0.06},
    {label:'Poor — drains fast or below 80% health', deduction:0.15},
  ]},
  { key:'accessories', title:'Do you have the original box and cable?', options:[
    {label:'Yes, complete', deduction:0},
    {label:'No, device only', deduction:0.03},
  ]},
];

// ── Repairs / financing / FAQ / team ─────────────────────────
const REPAIR_SERVICES = [
  {device:'iPhone', issue:'Screen replacement', priceFrom:899, turnaround:'Same day'},
  {device:'iPhone', issue:'Battery replacement', priceFrom:549, turnaround:'Same day'},
  {device:'iPhone', issue:'Back glass replacement', priceFrom:749, turnaround:'24–48 hrs'},
  {device:'iPhone', issue:'Charging port repair', priceFrom:499, turnaround:'Same day'},
  {device:'iPhone', issue:'Water damage diagnostic & repair', priceFrom:399, turnaround:'24–72 hrs'},
  {device:'Samsung Galaxy', issue:'Screen replacement', priceFrom:999, turnaround:'24–48 hrs'},
  {device:'Samsung Galaxy', issue:'Battery replacement', priceFrom:599, turnaround:'Same day'},
  {device:'iPad', issue:'Screen & digitiser replacement', priceFrom:1299, turnaround:'2–3 days'},
  {device:'Apple Watch', issue:'Screen replacement', priceFrom:799, turnaround:'Same day'},
  {device:'MacBook', issue:'Battery replacement', priceFrom:1599, turnaround:'2–3 days'},
  {device:'MacBook', issue:'Keyboard / trackpad repair', priceFrom:1899, turnaround:'3–5 days'},
  {device:'AirPods', issue:'Battery / charging case issue', priceFrom:449, turnaround:'24–48 hrs'},
];
const FINANCING_PLANS = [
  {months:3, label:'3 months', tag:'Interest-free'},
  {months:6, label:'6 months', tag:'Interest-free'},
  {months:12, label:'12 months', tag:'Low fixed rate'},
  {months:24, label:'24 months', tag:'Low fixed rate'},
];
const FAQS = [
  {category:'Buying', question:'What does each condition grade actually mean?', answer:'Pristine means no visible wear under close inspection. Excellent means minor signs of use only visible in direct light. Good means light, visible wear that doesn\u2019t affect performance. Fair means clearly used but fully functional and tested. Every grade is assigned by our technicians against a written checklist, never by guesswork.'},
  {category:'Buying', question:'Are your devices unlocked?', answer:'Yes. Every device we sell is network-unlocked and free of iCloud, Google or Samsung account locks before it\u2019s listed for sale.'},
  {category:'Buying', question:'Do devices come with accessories?', answer:"Each listing shows exactly what's included — usually a charging cable and our certified packaging. Power adapters are included only where the original device shipped with one."},
  {category:'Warranty & Repairs', question:'What does the 30-day warranty cover?', answer:'Any functional fault not caused by accidental damage — battery, charging, buttons, cameras, connectivity and display issues are all covered for free repair, replacement or refund within 30 days of delivery.'},
  {category:'Warranty & Repairs', question:"Can I book a repair for a device I didn't buy from you?", answer:'Yes, our repair service is open to any iPhone, Samsung Galaxy, iPad, Apple Watch or MacBook, regardless of where it was purchased.'},
  {category:'Trade-In & Selling', question:'How is my trade-in or sell quote calculated?', answer:"We start from a base market value for your exact model and storage, then adjust for cosmetic condition, battery health and functionality based on your answers. The quote you receive online is the price we honour once the device matches your description."},
  {category:'Trade-In & Selling', question:"What's the difference between trading in and selling?", answer:'Trade-in credit is applied directly to a purchase and typically values your device slightly higher. Selling pays you cash via bank transfer, usually within 24 hours of us receiving and inspecting the device.'},
  {category:'Trade-In & Selling', question:"What if my device doesn't match the condition I described?", answer:"We'll always contact you with a revised quote before finalising anything. You're free to accept the new offer or have the device shipped back to you at no cost."},
  {category:'Delivery & Payment', question:'How long does nationwide delivery take?', answer:'Most orders arrive within 1–3 working days in major metros and 2–5 working days elsewhere in South Africa. You\u2019ll receive tracking as soon as your order is dispatched.'},
  {category:'Delivery & Payment', question:'What payment methods do you accept?', answer:'We accept card payments, Instant EFT and financing plans through our South African payment partners, plus card payments internationally.'},
  {category:'Delivery & Payment', question:'Is my payment secure?', answer:'Yes. All payments are processed through PCI-compliant payment gateways — we never see or store your full card details.'},
  {category:'General', question:'Where are you based?', answer:'iConnect Pre-Owned operates online with fulfilment centres serving all nine provinces. Delivery is nationwide, door to door.'},
  {category:'General', question:'Do you offer a money-back guarantee?', answer:'Yes — if a device isn\u2019t right for you, you can return it unused in its original condition within 30 days for a full refund.'},
];
const TEAM = [
  {name:'Naledi Khumalo', role:'Founder & CEO', bio:'Started iConnect Pre-Owned in 2019 after years in mobile retail, convinced South Africans deserved a more transparent way to buy pre-owned tech.'},
  {name:'Ahmed Suleman', role:'Head of Device Certification', bio:'Leads the technician team behind our 60-point inspection process, refined over tens of thousands of certified devices.'},
  {name:'Lerato Dlamini', role:'Customer Experience Lead', bio:'Makes sure every trade-in, repair booking and support query gets a fast, honest answer from a real person.'},
  {name:'Marco Pienaar', role:'Operations & Logistics Manager', bio:'Runs the nationwide courier network that gets certified devices to your door in as little as one working day.'},
];
const INSPECTION_POINTS = [
  'Battery health & charging performance',
  'Screen, digitiser & True Tone / colour accuracy',
  'Front & rear cameras, flash and Face/Touch ID',
  'Speakers, microphones & haptics',
  'Wi-Fi, Bluetooth, cellular & GPS signal',
  'Buttons, ports & wireless charging coil',
  'Water-resistance seals (where applicable)',
  'Full data wipe & factory account removal',
];

// ── Product card renderer (shared by home / shop / related / arrivals) ──
function productCardHTML(p){
  const off = Math.round((1 - p.price/p.was)*100);
  const meta = CATEGORY_META[p.category];
  return `<div class="product-card">
    <div style="position:relative;">
      <a href="product.html?slug=${p.slug}" style="display:block;">
        <div class="product-art" style="background-image:${meta.gradient}">${DEVICE_ICONS[meta.icon]}</div>
      </a>
      <div class="product-art-badges">
        <span class="badge ${CONDITION_TONE[p.condition]}"><span class="dot"></span>${p.condition}</span>
        <span class="badge badge-dark">Save ${off}%</span>
      </div>
      <button class="fav-btn" aria-label="Add ${p.name} to wishlist" aria-pressed="false" onclick="toggleFav(this)">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></svg>
      </button>
    </div>
    <div class="product-body">
      <p class="product-cat">${p.category}</p>
      <a href="product.html?slug=${p.slug}"><p class="product-name">${p.name}</p></a>
      <div class="product-meta">${p.battery ? `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><path d="M6 10v4"/></svg> ${p.battery}%` : ''}</div>
      <div class="rating-row"><span class="stars">${starsHTML(p.rating)}</span>${p.rating.toFixed(1)} <span style="color:rgb(var(--ink-faint));">(${p.reviews})</span></div>
      <div class="price-row"><span class="now">${fmtZAR(p.price)}</span><span class="was">${fmtZAR(p.was)}</span></div>
      <div class="stock-row"><span class="badge ${p.stock<=3?'badge-caution':'badge-positive'}"><span class="dot"></span>${p.stock<=3?`Only ${p.stock} left`:'In stock'}</span></div>
      <div class="product-actions">
        <button class="add-cart-btn" onclick="addToCart({ productId: '${p.slug}', name: '${p.name.replace(/'/g,"\\'")}', selectedStorage: '${p.storage[0] || ''}', selectedColor: '${p.colors[0] || ''}', qty: 1 })">Add to cart</button>
      </div>
    </div>
  </div>`;
}
