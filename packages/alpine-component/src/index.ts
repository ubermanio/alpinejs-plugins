import type { Alpine } from "alpinejs"
import { nanoid } from "nanoid/non-secure"

declare global {
   interface Window {
      _ALPINE_COMPONENT_PROPS: Record<string, Record<string, string>>
   }
}

window._ALPINE_COMPONENT_PROPS = {}

const ParamPlugin = (Alpine: Alpine) => {
   Alpine.directive("component", (node, { expression }) => {
      const component = class extends HTMLElement {
         constructor() {
            super()

            const componentId = nanoid(6)

            window._ALPINE_COMPONENT_PROPS[componentId] = {}

            const componentAttrs = Array.from(this.attributes)

            const data: Record<string, any> = {}
            this.querySelectorAll("[slot]").forEach((el) => {
               data[el.getAttribute("slot") as string] = el
            })

            this.innerHTML = (node as Element).innerHTML

            const child = this.firstElementChild
            componentAttrs.forEach((attr) => {
               if (attr.name.startsWith("x-prop:")) return
               this.removeAttribute(attr.name)
               child?.setAttribute(attr.name.replace(/^@/, "x-on:"), attr.value)
            })

            this.setAttribute("component-id", componentId)

            this.querySelectorAll("slot").forEach((el) => {
               const slot = el.getAttribute("name") as string
               console.log(data[slot])
               el.innerHTML = data[slot]?.outerHTML || ""
            })
         }
      }

      customElements.define(expression, component)
   })

   Alpine.directive("prop", (node, { value, expression }) => {
      const componentId = (node as Element).getAttribute(
         "component-id"
      ) as string
      window._ALPINE_COMPONENT_PROPS[componentId] = {
         ...window._ALPINE_COMPONENT_PROPS[componentId],
         [value]: expression,
      }
   })

   Alpine.magic("attr", (node) => (value: string) => {
      const componentId = node.parentElement?.getAttribute(
         "component-id"
      ) as string
      return window._ALPINE_COMPONENT_PROPS[componentId][value]
   })
}

export default ParamPlugin
