const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')

const html = fs.readFileSync(path.resolve(__dirname, 'price.test.html'), 'utf8')

let dom
let container

jest.dontMock('fs')

function waitForDom() {
  return new Promise(resolve => {
    dom = new JSDOM(html, {
      runScripts: 'dangerously',
      resources: 'usable',
      url: `file://${path.resolve(__dirname)}/price.test.html`
    })
    dom.window.document.addEventListener('DOMContentLoaded', () => {
      resolve()
    })
  })
}

beforeAll(() => waitForDom())

beforeEach(() => {
  container = dom.window.document.body
})

afterEach(() => (container = null))

it('should read language and currency from global `alpinePriceOptions` object and format `123.45` correctly (to `123,45 €`)', done => {
  dom.window.document.addEventListener('alpine:initialized', () => {
    const renderedHTML = dom.window.document.getElementById('__test').innerHTML

    expect(renderedHTML).toMatch(/^123,45/)
    expect(renderedHTML).toMatch(/€$/)

    done()
  })
  dom.window.Alpine.start()
})
