import FormPlugin from "../src/index"

import type { Alpine } from "alpinejs"

declare global {
   interface Window {
      Alpine: Alpine
   }
}

document.addEventListener("alpine:init", () => {
   console.log("init")
   window.Alpine.plugin(FormPlugin)
})
