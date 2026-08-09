function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderHeroPreview() {
  const container = document.getElementById('hero-preview');
  // pick 3 representative models across the price range for the hero
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

function renderCatalog(filterText = '') {
  const grid = document.getElementById('catalog-grid');
  const filtered = PRODUCTS.filter(p =>
    p.model.toLowerCase().includes(filterText.toLowerCase())
  );

  if (!filtered.length) {
    grid.innerHTML = '<div class="no-results">No models match that search.</div>';
    return;
  }

  grid.innerHTML = filtered.map(product => `
    <div class="product-card">
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
  renderCatalog();

  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    renderCatalog(e.target.value);
  });
});
