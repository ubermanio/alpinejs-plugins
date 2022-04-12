var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// builds/module.ts
var module_exports = {};
__export(module_exports, {
  default: () => module_default
});
module.exports = __toCommonJS(module_exports);

// src/index.ts
var PricePlugin = (pricePluginOptions) => {
  var _a, _b;
  const options = Object.assign(window.alpinePriceOptions || {}, pricePluginOptions);
  const inCents = (options == null ? void 0 : options.inCents) || (options == null ? void 0 : options.shopify);
  const formatter = new Intl.NumberFormat((options == null ? void 0 : options.language) || window.navigator.userLanguage || window.navigator.language, {
    style: "currency",
    currency: (options == null ? void 0 : options.shopify) ? (_b = (_a = window.Shopify) == null ? void 0 : _a.currency) == null ? void 0 : _b.active : options == null ? void 0 : options.currency
  });
  return (Alpine) => {
    Alpine.magic("price", () => (price) => formatter.format(inCents ? price / 100 : price));
  };
};
var src_default = PricePlugin;

// builds/module.ts
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
