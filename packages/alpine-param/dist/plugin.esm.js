// src/index.ts
var ParamPlugin = (Alpine) => {
  Alpine.magic("param", () => (param) => new URLSearchParams(window.location.search).get(param));
};
var src_default = ParamPlugin;

// builds/module.ts
var module_default = src_default;
export {
  module_default as default
};
