import type { Alpine } from 'alpinejs'

const EVENTS = {
  TEST_PASSED: 'alpine:test:passed',
  TEST_FAILED: 'alpine:test:failed',
  ALL_TESTS_RAN: 'alpine:test:finished'
}

type Modifier = 'throw' | 'nolog'

type Test = {
  element: Element
  test: string
  modifiers?: Modifier[]
}

const TestPlugin = (Alpine: Alpine) => {
  const tests: Test[] = []

  Alpine.directive(
    'test',
    (node, { modifiers, expression }, { Alpine: _Alpine }) => {
      const el = node as Element

      // Only push and thus run the tests if browser env is JSDOM ( => test runner)
      if (
        navigator.userAgent.includes('Node.js') ||
        navigator.userAgent.includes('jsdom')
      ) {
        tests.push({
          element: el,
          test: expression,
          // TODO: check validity of modifiers
          modifiers: modifiers as Modifier[]
        })
      } else {
        el.removeAttribute('x-test')
      }
    }
  )

  document.addEventListener('alpine:initialized', () => {
    Alpine.nextTick(() => {
      let failedTests = 0
      let passedTests = 0
      let startTimestamp = Date.now()

      tests.forEach(({ element, test, modifiers }) => {
        const array = Alpine.evaluate(element, test) as [string, ...boolean[]]

        if (!Array.isArray(array)) throw new Error('Invalid x-test directive')
        if (array.length <= 1)
          throw new Error(
            'Invalid x-test directive: either missing message or tests'
          )
        if (typeof array[0] !== 'string')
          throw new Error(
            'Invalid x-test directive: first element in array must be the test message of type script'
          )

        let [message, ...checks] = array

        if (checks.every(Boolean)) {
          passedTests++
          document.dispatchEvent(
            new CustomEvent(EVENTS.TEST_PASSED, {
              detail: {
                element,
                message,
                test
              }
            })
          )
        } else {
          failedTests++
          document.dispatchEvent(
            new CustomEvent(EVENTS.TEST_FAILED, {
              detail: {
                element,
                message,
                test
              }
            })
          )

          if (modifiers?.includes('throw')) throw new Error(`Test failed`)
        }
      })

      document.dispatchEvent(
        new CustomEvent(EVENTS.ALL_TESTS_RAN, {
          detail: {
            failed: failedTests,
            passedTests: passedTests,
            duration: Date.now() - startTimestamp
          }
        })
      )
    })
  })
}

export default TestPlugin
