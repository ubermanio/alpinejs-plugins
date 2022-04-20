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
          child?.setAttribute(attr.name.replace(/^@/, "x-on:"), attr.value);
        });
        this.setAttribute("component-id", componentId);
        this.querySelectorAll("slot").forEach((el) => {
          const slot = el.getAttribute("name");
          console.log(data[slot]);
          el.innerHTML = data[slot]?.outerHTML || "";
        });
      }
    };
    customElements.define(expression, component);
  });
  Alpine.directive("prop", (node, { value, expression }) => {
    const componentId = node.getAttribute("component-id");
    window._ALPINE_COMPONENT_PROPS[componentId] = {
      ...window._ALPINE_COMPONENT_PROPS[componentId],
      [value]: expression
    };
  });
  Alpine.magic("attr", (node) => (value) => {
    const componentId = node.parentElement?.getAttribute("component-id");
    return window._ALPINE_COMPONENT_PROPS[componentId][value];
  });
};
var src_default = ParamPlugin;

// builds/module.ts
var module_default = src_default;
export {
  module_default as default
};
