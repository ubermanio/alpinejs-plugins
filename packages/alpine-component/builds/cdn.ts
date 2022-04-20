import ComponentPlugin from '../src/index'

import type { Alpine } from 'alpinejs'

declare global {
  interface Window {
    Alpine: Alpine
  }
}

document.addEventListener('alpine:init', () => {
  window.Alpine.plugin(ComponentPlugin)
})
