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
    _values: options?.initialValues || {},
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
      this._touched[name] = false;
      this._values[name] ??= "";
      this._rules[name] ??= validators;
      this._errors[name] = [];
      return {
        ["@change"]: (e) => {
          this._values[name] = parseValue(e.target?.value);
        },
        ["@input"]: (e) => {
          this._values[name] = parseValue(e.target?.value);
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
export {
  module_default as default
};
