/* ─────────────────────────────────────────────────────────────
   iConnect Pre-Owned — shared page behaviour
   Requires data.js to be loaded first. Include on every page,
   after the shared header/footer markup and before any
   page-specific inline <script>.
   ───────────────────────────────────────────────────────────── */

// ── Trust badge strip (used on hero + footer) ──────────────────
const TRUST = [
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>', label:'Certified Devices'},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2M6 10v4"/></svg>', label:'Battery Health Checked'},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="m9 16 2 2 4-4"/></svg>', label:'30-Day Warranty'},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="11" width="16" height="9" rx="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>', label:'Secure Payments'},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8Z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>', label:'Nationwide Delivery'},
  {icon:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>', label:'Money-Back Guarantee'},
];
function renderTrustStrip(elId){
  const el = document.getElementById(elId);
  if(!el) return;
  el.innerHTML = TRUST.map(t => `<div class="trust-item"><span class="trust-icon">${t.icon}</span><span>${t.label}</span></div>`).join('');
}

// ── Dark mode ────────────────────────────────────────────────
(function initTheme(){
  const root = document.documentElement;
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  // No persistence across pages by design (see README) — starts from OS preference each load.
  if (prefersDark) root.setAttribute('data-theme', 'dark');
})();

function setupThemeToggle(btnId, iconId){
  const btn = document.getElementById(btnId);
  const icon = document.getElementById(iconId);
  if(!btn) return;
  const root = document.documentElement;
  const SUN = '<path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>';
  const MOON = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"/>';
  if(icon) icon.innerHTML = root.getAttribute('data-theme') === 'dark' ? SUN : MOON;
  btn.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    if(icon) icon.innerHTML = isDark ? MOON : SUN;
    btn.setAttribute('aria-label', isDark ? 'Switch to dark mode' : 'Switch to light mode');
  });
}

// ── Sticky navbar shadow on scroll ──────────────────────────────
function setupStickyNav(headerId){
  const header = document.getElementById(headerId);
  if(!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, {passive:true});
}

// ── Mobile menu ──────────────────────────────────────────────
function setupMobileMenu(menuBtnId, closeBtnId, menuId, overlayId){
  const menuBtn = document.getElementById(menuBtnId);
  const closeBtn = document.getElementById(closeBtnId);
  const menu = document.getElementById(menuId);
  const overlay = document.getElementById(overlayId);
  if(!menuBtn || !menu || !overlay) return;
  let previousFocus = null;
  const focusableSelectors = 'a[href], button:not([disabled]), input, textarea, select';
  let keydownHandler = null;

  function trapFocus(event){
    if(event.key !== 'Tab') return;
    const focusable = Array.from(menu.querySelectorAll(focusableSelectors)).filter(el => el.offsetParent !== null);
    if(focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if(event.shiftKey && document.activeElement === first){
      event.preventDefault();
      last.focus();
    } else if(!event.shiftKey && document.activeElement === last){
      event.preventDefault();
      first.focus();
    }
  }

  function open(){
    if(menu.classList.contains('open')) return;
    if(keydownHandler){
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }
    previousFocus = document.activeElement;
    menu.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
    menuBtn.setAttribute('aria-expanded', 'true');
    if(closeBtn){ closeBtn.focus(); }
    keydownHandler = function(event){
      if(event.key === 'Escape'){
        close();
      } else {
        trapFocus(event);
      }
    };
    document.addEventListener('keydown', keydownHandler);
  }
  function close(){
    menu.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow='';
    menuBtn.setAttribute('aria-expanded', 'false');
    if(previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    if(keydownHandler){
      document.removeEventListener('keydown', keydownHandler);
      keydownHandler = null;
    }
  }
  menuBtn.setAttribute('aria-expanded', 'false');
  menuBtn.addEventListener('click', open);
  if(closeBtn) closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', close);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

// ── Cart / wishlist demo counters ───────────────────────────────
// In-memory only (resets on navigation) — this is a static, backend-free
// build. To persist across pages when you deploy this for real, swap the
// two variables below for localStorage reads/writes (one line each).
let cartCount = 0;
let wishlistCount = 0;

function addToCart(name){
  cartCount++;
  document.querySelectorAll('[data-cart-count]').forEach(el => { el.textContent = cartCount; el.style.display = 'flex'; });
  document.querySelectorAll('[data-cart-btn]').forEach(el => el.setAttribute('aria-label', `Cart, ${cartCount} items`));
}
function toggleFav(btn){
  const active = btn.classList.toggle('active');
  wishlistCount += active ? 1 : -1;
  btn.setAttribute('aria-pressed', String(active));
  document.querySelectorAll('[data-wishlist-count]').forEach(el => {
    if(wishlistCount > 0){ el.textContent = wishlistCount; el.style.display = 'flex'; } else { el.style.display = 'none'; }
  });
}
function setupCartWishlistButtons(cartBtnId, wishlistBtnId){
  const cartBtn = document.getElementById(cartBtnId);
  const wishlistBtn = document.getElementById(wishlistBtnId);
  if(cartBtn) cartBtn.addEventListener('click', () => alert('This static build shows the design only — the Next.js version (also in your download) has a real slide-out cart.'));
  if(wishlistBtn) wishlistBtn.addEventListener('click', () => { if(wishlistCount === 0) alert("Your wishlist is empty in this demo — tap the heart on any product first."); });
}

// ── Scroll reveal (IntersectionObserver) ────────────────────────
function setupScrollReveal(){
  const els = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window)){ els.forEach(el => el.classList.add('visible')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
  }, { threshold:.1, rootMargin:'0px 0px -60px 0px' });
  els.forEach(el => io.observe(el));
}
// Call again after dynamically injecting .reveal elements (e.g. product grids).
function observeReveal(selector){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); io.unobserve(entry.target); } });
  }, { threshold:.1, rootMargin:'0px 0px -60px 0px' });
  document.querySelectorAll(selector).forEach(el => io.observe(el));
}

// ── Horizontal scroller arrows ───────────────────────────────
function scrollByCard(id, dir){
  const el = document.getElementById(id);
  if(!el) return;
  const card = el.querySelector(':scope > *');
  const amount = (card ? card.offsetWidth : 300) + 20;
  el.scrollBy({ left: amount * dir, behavior: 'smooth' });
}

// ── Newsletter fake-submit (used on home + contact) ─────────────
function setupNewsletterForm(formId, msgId){
  const form = document.getElementById(formId);
  const msg = document.getElementById(msgId);
  if(!form) return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    if(msg) msg.textContent = "Demo only: this static site does not send email confirmations.";
    form.reset();
  });
}

// ── Boilerplate every page runs on load ─────────────────────────
function initSharedChrome(){
  setupStickyNav('navHeader');
  setupThemeToggle('themeToggle', 'themeIcon');
  setupMobileMenu('menuBtn', 'closeMenuBtn', 'mobileMenu', 'mobileOverlay');
  setupCartWishlistButtons('cartBtn', 'wishlistBtn');
  renderTrustStrip('heroTrust');
  renderTrustStrip('footerTrust');
  setupScrollReveal();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded', initSharedChrome);
