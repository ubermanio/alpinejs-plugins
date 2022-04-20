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
var parseValue = (val) => {
  try {
    return JSON.parse(val);
  } catch (error) {
    return val.toString();
  }
};
var FormPlugin = (Alpine) => {
  Alpine.data("form", () => (url, options = {}) => ({
    init() {
      console.log({ url, options });
    },
    url,
    _touched: {},
    _values: (options == null ? void 0 : options.initialValues) || {},
    _errors: {},
    _rules: {},
    _validate(submitted = false) {
      Object.keys(this._errors).forEach((field) => {
        this._errors[field] = [];
      });
      console.log("validating");
      Object.keys(this._rules).forEach((field) => {
        if (!submitted) {
          if (!this._touched[field])
            return;
        }
        const validatorFunction = this._rules[field];
        const value = this._values[field];
        const results = validatorFunction(value);
        results.forEach(([check, message]) => {
          console.log({ field, check, message });
          if (!check)
            this._errors[field].push(message);
        });
      });
    },
    field(name, validators = () => []) {
      var _a, _b, _c, _d;
      this._touched[name] = false;
      (_b = (_a = this._values)[name]) != null ? _b : _a[name] = "";
      (_d = (_c = this._rules)[name]) != null ? _d : _c[name] = validators;
      this._errors[name] = [];
      return {
        ["@change"]: (e) => {
          var _a2;
          this._values[name] = parseValue((_a2 = e.target) == null ? void 0 : _a2.value);
        },
        ["@input"]: (e) => {
          var _a2;
          this._values[name] = parseValue((_a2 = e.target) == null ? void 0 : _a2.value);
          this._validate();
        },
        ["@focus"]: () => {
          if (!this._touched[name])
            this._touched[name] = true;
        },
        [":value"]: () => {
          return this._values[name];
        }
      };
    }
  }));
};
var src_default = FormPlugin;

// builds/module.ts
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
