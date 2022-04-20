import type { Alpine } from "alpinejs"

const ParamPlugin = (Alpine: Alpine) => {
   Alpine.magic(
      "param",
      () => (param: string) =>
         new URLSearchParams(window.location.search).get(param)
   )
}

export default ParamPlugin
