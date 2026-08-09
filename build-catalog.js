const fs = require('fs');
const path = require('path');
const { MARKUP_PERCENT, PRODUCTS } = require('./products');

function retailPrice(wholesale) {
  const price = wholesale * (1 + MARKUP_PERCENT / 100);
  return Math.round(price / 10) * 10;
}

const catalog = PRODUCTS.map(product => ({
  model: product.model,
  variants: product.variants.map(variant => ({
    storage: variant.storage,
    price: retailPrice(variant.wholesale)
  }))
}));

const output = `const CATALOG = ${JSON.stringify(catalog, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'catalog.js'), output, 'utf8');
console.log('Generated catalog.js with public product data.');
