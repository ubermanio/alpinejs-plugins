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
var EVENTS = {
  TEST_PASSED: "alpine:test:passed",
  TEST_FAILED: "alpine:test:failed",
  ALL_TESTS_RAN: "alpine:test:finished"
};
var TestPlugin = (Alpine) => {
  const tests = [];
  Alpine.directive("test", (node, { modifiers, expression }, { Alpine: _Alpine }) => {
    const el = node;
    if (navigator.userAgent.includes("Node.js") || navigator.userAgent.includes("jsdom")) {
      tests.push({
        element: el,
        test: expression,
        modifiers
      });
    } else {
      el.removeAttribute("x-test");
    }
  });
  document.addEventListener("alpine:initialized", () => {
    Alpine.nextTick(() => {
      let failedTests = 0;
      let passedTests = 0;
      let startTimestamp = Date.now();
      tests.forEach(({ element, test, modifiers }) => {
        const array = Alpine.evaluate(element, test);
        if (!Array.isArray(array))
          throw new Error("Invalid x-test directive");
        if (array.length <= 1)
          throw new Error("Invalid x-test directive: either missing message or tests");
        if (typeof array[0] !== "string")
          throw new Error("Invalid x-test directive: first element in array must be the test message of type script");
        let [message, ...checks] = array;
        if (checks.every(Boolean)) {
          passedTests++;
          document.dispatchEvent(new CustomEvent(EVENTS.TEST_PASSED, {
            detail: {
              element,
              message,
              test
            }
          }));
        } else {
          failedTests++;
          document.dispatchEvent(new CustomEvent(EVENTS.TEST_FAILED, {
            detail: {
              element,
              message,
              test
            }
          }));
          if (modifiers == null ? void 0 : modifiers.includes("throw"))
            throw new Error(`Test failed`);
        }
      });
      document.dispatchEvent(new CustomEvent(EVENTS.ALL_TESTS_RAN, {
        detail: {
          failed: failedTests,
          passedTests,
          duration: Date.now() - startTimestamp
        }
      }));
    });
  });
};
var src_default = TestPlugin;

// builds/module.ts
var module_default = src_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
