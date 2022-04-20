var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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

// ../../node_modules/.pnpm/nanoid@3.3.2/node_modules/nanoid/non-secure/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
var nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};

// src/index.ts
window._ALPINE_COMPONENT_PROPS = {};
var ParamPlugin = (Alpine) => {
  Alpine.directive("component", (node, { expression }) => {
    const component = class extends HTMLElement {
      constructor() {
        super();
        const componentId = nanoid(6);
        window._ALPINE_COMPONENT_PROPS[componentId] = {};
        const componentAttrs = Array.from(this.attributes);
        const data = {};
        this.querySelectorAll("[slot]").forEach((el) => {
          data[el.getAttribute("slot")] = el;
        });
        this.innerHTML = node.innerHTML;
        const child = this.firstElementChild;
        componentAttrs.forEach((attr) => {
          if (attr.name.startsWith("x-prop:"))
            return;
          this.removeAttribute(attr.name);
          child == null ? void 0 : child.setAttribute(attr.name.replace(/^@/, "x-on:"), attr.value);
        });
        this.setAttribute("component-id", componentId);
        this.querySelectorAll("slot").forEach((el) => {
          var _a;
          const slot = el.getAttribute("name");
          console.log(data[slot]);
          el.innerHTML = ((_a = data[slot]) == null ? void 0 : _a.outerHTML) || "";
        });
      }
    };
    customElements.define(expression, component);
  });
  Alpine.directive("prop", (node, { value, expression }) => {
    const componentId = node.getAttribute("component-id");
    window._ALPINE_COMPONENT_PROPS[componentId] = __spreadProps(__spreadValues({}, window._ALPINE_COMPONENT_PROPS[componentId]), {
      [value]: expression
    });
  });
  Alpine.magic("attr", (node) => (value) => {
    var _a;
    const componentId = (_a = node.parentElement) == null ? void 0 : _a.getAttribute("component-id");
    return window._ALPINE_COMPONENT_PROPS[componentId][value];
  });
};
var src_default = ParamPlugin;

// builds/module.ts
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
