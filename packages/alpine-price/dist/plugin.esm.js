// src/index.ts
var PricePlugin = (pricePluginOptions) => {
  const options = Object.assign(window.alpinePriceOptions || {}, pricePluginOptions);
  const inCents = options?.inCents || options?.shopify;
  const formatter = new Intl.NumberFormat(options?.language || window.navigator.userLanguage || window.navigator.language, {
    style: "currency",
    currency: options?.shopify ? window.Shopify?.currency?.active : options?.currency
  });
  return (Alpine) => {
    Alpine.magic("price", () => (price) => formatter.format(inCents ? price / 100 : price));
  };
};
var src_default = PricePlugin;

// builds/module.ts
var module_default = src_default;
export {
  module_default as default
};
