// iConnect Pre-Owned — product catalog
// Sourced from Gorilla Phones wholesale pricelist (2026)
// wholesale = supplier cost in ZAR. Retail price is computed automatically.

const MARKUP_PERCENT = 20; // <-- change this ONE number to adjust markup on every product at once

const PRODUCTS = [
  { model: "iPhone 6S", variants: [
    { storage: "16GB", wholesale: 1600 }, { storage: "32GB", wholesale: 1600 }, { storage: "64GB", wholesale: 1600 }
  ]},
  { model: "iPhone 6S Plus", variants: [
    { storage: "16GB", wholesale: 2100 }, { storage: "32GB", wholesale: 2100 }, { storage: "64GB", wholesale: 2100 }
  ]},
  { model: "iPhone 7", variants: [
    { storage: "32GB", wholesale: 1500 }, { storage: "128GB", wholesale: 1700 }, { storage: "256GB", wholesale: 2000 }
  ]},
  { model: "iPhone 7 Plus", variants: [
    { storage: "32GB", wholesale: 2000 }, { storage: "128GB", wholesale: 2200 }, { storage: "256GB", wholesale: 2700 }
  ]},
  { model: "iPhone 8", variants: [
    { storage: "64GB", wholesale: 2000 }, { storage: "128GB", wholesale: 2300 }, { storage: "256GB", wholesale: 2600 }
  ]},
  { model: "iPhone 8 Plus", variants: [
    { storage: "64GB", wholesale: 2700 }, { storage: "256GB", wholesale: 3200 }
  ]},
  { model: "iPhone X", variants: [
    { storage: "64GB", wholesale: 3400 }, { storage: "256GB", wholesale: 4000 }
  ]},
  { model: "iPhone XR", variants: [
    { storage: "64GB", wholesale: 3200 }, { storage: "128GB", wholesale: 3700 }, { storage: "256GB", wholesale: 4700 }
  ]},
  { model: "iPhone XS", variants: [
    { storage: "64GB", wholesale: 3500 }, { storage: "256GB", wholesale: 4200 }
  ]},
  { model: "iPhone XS Max", variants: [
    { storage: "64GB", wholesale: 4200 }, { storage: "256GB", wholesale: 4500 }
  ]},
  { model: "iPhone 11", variants: [
    { storage: "64GB", wholesale: 4000 }, { storage: "128GB", wholesale: 4500 }, { storage: "256GB", wholesale: 5100 }
  ]},
  { model: "iPhone 11 Pro", variants: [
    { storage: "64GB", wholesale: 5000 }, { storage: "256GB", wholesale: 5600 }
  ]},
  { model: "iPhone 11 Pro Max", variants: [
    { storage: "64GB", wholesale: 6000 }, { storage: "256GB", wholesale: 6800 }
  ]},
  { model: "iPhone SE (2020)", variants: [
    { storage: "64GB", wholesale: 2500 }, { storage: "128GB", wholesale: 3500 }
  ]},
  { model: "iPhone 12", variants: [
    { storage: "64GB", wholesale: 4700 }, { storage: "128GB", wholesale: 5300 }, { storage: "256GB", wholesale: 6100 }
  ]},
  { model: "iPhone 12 Mini", variants: [
    { storage: "64GB", wholesale: 4300 }, { storage: "128GB", wholesale: 4700 }, { storage: "256GB", wholesale: 5000 }
  ]},
  { model: "iPhone 12 Pro", variants: [
    { storage: "128GB", wholesale: 6500 }, { storage: "256GB", wholesale: 7500 }
  ]},
  { model: "iPhone 12 Pro Max", variants: [
    { storage: "128GB", wholesale: 7200 }, { storage: "256GB", wholesale: 8500 }
  ]},
  { model: "iPhone SE (2022)", variants: [
    { storage: "64GB", wholesale: 4100 }, { storage: "128GB", wholesale: 5000 }
  ]},
  { model: "iPhone 13", variants: [
    { storage: "128GB", wholesale: 6500 }, { storage: "256GB", wholesale: 7500 }
  ]},
  { model: "iPhone 13 Mini", variants: [
    { storage: "128GB", wholesale: 5600 }, { storage: "256GB", wholesale: 6500 }
  ]},
  { model: "iPhone 13 Pro", variants: [
    { storage: "128GB", wholesale: 8500 }, { storage: "256GB", wholesale: 9500 }
  ]},
  { model: "iPhone 13 Pro Max", variants: [
    { storage: "128GB", wholesale: 9900 }, { storage: "256GB", wholesale: 11300 }
  ]},
  { model: "iPhone 14", variants: [
    { storage: "128GB", wholesale: 7800 }, { storage: "256GB", wholesale: 8800 }
  ]},
  { model: "iPhone 14 Pro", variants: [
    { storage: "128GB", wholesale: 8800 }, { storage: "256GB", wholesale: 9800 }
  ]},
  { model: "iPhone 14 Pro Max", variants: [
    { storage: "128GB", wholesale: 10400 }, { storage: "256GB", wholesale: 11300 }
  ]},
  { model: "iPhone 15", variants: [
    { storage: "128GB", wholesale: 10400 }, { storage: "256GB", wholesale: 11300 }
  ]},
  { model: "iPhone 15 Pro", variants: [
    { storage: "128GB", wholesale: 13700 }, { storage: "256GB", wholesale: 14800 }
  ]},
  { model: "iPhone 15 Pro Max", variants: [
    { storage: "256GB", wholesale: 16000 }
  ]},
  { model: "iPhone 16", variants: [
    { storage: "256GB", wholesale: 14300 }
  ]},
  { model: "iPhone 16 Pro", variants: [
    { storage: "256GB", wholesale: 18400 }
  ]},
  { model: "iPhone 16 Pro Max", variants: [
    { storage: "256GB", wholesale: 20000 }
  ]}
];

function retailPrice(wholesale) {
  const price = wholesale * (1 + MARKUP_PERCENT / 100);
  return Math.round(price / 10) * 10; // round to nearest R10, cleaner price tags
}

function formatZAR(amount) {
  return 'R' + amount.toLocaleString('en-ZA');
}
