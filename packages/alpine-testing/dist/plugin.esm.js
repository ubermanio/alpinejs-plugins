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
          if (modifiers?.includes("throw"))
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
export {
  module_default as default
};
