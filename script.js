function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderHeroPreview() {
  const container = document.getElementById('hero-preview');
  if (!container) return; // only present on index.html

  const picks = ['iPhone 13', 'iPhone 12', 'iPhone SE (2022)'];
  const cards = picks.map(name => {
    const product = PRODUCTS.find(p => p.model === name);
    if (!product) return '';
    const variant = product.variants[0];
    const price = retailPrice(variant.wholesale);
    return `
      <div class="preview-card">
        <div>
          <div class="pc-name">${escapeHtml(product.model)}</div>
          <div class="pc-storage">${escapeHtml(variant.storage)} · Verified</div>
        </div>
        <div class="pc-price">${formatZAR(price)}</div>
      </div>
    `;
  }).join('');
  container.innerHTML = cards;
}

function renderPricingNotice() {
  const container = document.getElementById('pricing-notice');
  if (!container) return; // only present on catalog.html

  const charger = chargerPrice();
  const delivery = deliveryPriceRange();
  container.innerHTML = `
    <div class="pn-item">
      <span class="pn-label">Chargers</span>
      <span class="pn-detail">Sold separately — ${formatZAR(charger)}</span>
    </div>
    <div class="pn-item">
      <span class="pn-label">Delivery</span>
      <span class="pn-detail">${formatZAR(delivery.low)}–${formatZAR(delivery.high)}, depending on your location</span>
    </div>
  `;
}

function renderCatalog(filterText = '') {
  const grid = document.getElementById('catalog-grid');
  if (!grid) return; // only present on catalog.html

  const filtered = PRODUCTS.filter(p =>
    p.model.toLowerCase().includes(filterText.toLowerCase())
  );

  if (!filtered.length) {
    grid.innerHTML = '<div class="no-results">No models match that search.</div>';
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="product-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          <rect x="6" y="2" width="12" height="20" rx="2.5"/>
          <circle cx="12" cy="17.5" r="0.6" fill="currentColor"/>
          <line x1="10" y1="4.2" x2="14" y2="4.2"/>
        </svg>
      </div>
      <h3>${escapeHtml(product.model)}</h3>
      ${product.variants.map(v => `
        <div class="variant-row">
          <span class="variant-storage">${escapeHtml(v.storage)}</span>
          <span class="variant-price">${formatZAR(retailPrice(v.wholesale))}</span>
        </div>
      `).join('')}
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderHeroPreview();
  renderPricingNotice();
  renderCatalog();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderCatalog(e.target.value);
    });
  }
});
