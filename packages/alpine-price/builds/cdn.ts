import PricePlugin from '../src/index'

import type { PricePluginOptions } from '../src/index'
import type { Alpine } from 'alpinejs'

declare global {
  interface Window {
    alpinePriceOptions: PricePluginOptions
    Alpine: Alpine
  }
}

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(PricePlugin(window.alpinePriceOptions))
})
