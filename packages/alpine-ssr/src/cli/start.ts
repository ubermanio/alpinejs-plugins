import type { CliOptions } from './index'

import fetch from 'isomorphic-unfetch'

import path from 'path'
import http from 'http'
// import glob from 'fast-glob'
import fs from 'fs/promises'
import { JSDOM } from 'jsdom'

export const start = async (options: CliOptions) => {
  console.log('starting in', process.cwd(), 'with', options)

  const routesDir = path.join(process.cwd(), 'routes')

  // const routes = await glob(path.join(routesDir, '**', '*.html'))
  // console.log('routes', routes)

  const index = await fs.readFile(path.join(routesDir, 'index.html'))

  const alpine = await fs.readFile(
    path.join(__dirname, '..', '..', 'alpine@3.9.5.min.js')
  )

  const html = `<!DOCTYPE html>
  <head>
    <script defer>${alpine}</script>
  </head>
  ${index}
  `

  const dom = new JSDOM(html, {
    runScripts: 'dangerously',
    resources: 'usable',
    beforeParse: window => {
      window.fetch = fetch
    }
  })

  console.time('domload')
  console.time('alpine')
  console.time('nexttick')

  dom.window.document.addEventListener('DOMContentLoaded', () => {
    // console.log('loaded')
    console.timeEnd('domload')

    // setTimeout(() => {
    //   console.log(dom.window.document.body.innerHTML)
    // }, 5000)
  })

  dom.window.document.addEventListener('alpine:initialized', () => {
    // console.log('initialized')
    console.timeEnd('alpine')

    dom.window.Alpine.nextTick(() => {
      console.timeEnd('nexttick')
      console.log(dom.window.document.body.innerHTML)
    })
  })
}

/**
  routes = [
    ['index', []],
  ]


 */

// export default (options: CliOptions) => {
//   console.log('starting in', process.cwd())
// }
