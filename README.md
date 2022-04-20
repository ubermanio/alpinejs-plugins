### This is a monorepo consisting of multiple useful Alpine.js plugins

> ⚠️ Disclaimer: This repository is currently mostly used for internal projects. We will still try to fix any bugs / issues however we will focus the development of this project more towards improving our internal toolset.

#### List of plugins

-  [**alpine-testing**](alpine-testing/README.md): A simple Alpine.js plugin for creating unit tests
-  [**alpine-price**](alpine-price/README.md): A simple magic utility for formatting prices
-  [**alpine-param**](alpine-param/README.md): A simple magic utility for working with URL query parameters
-  [**alpine-form**](alpine-form/README.md): A simple magic utility for working with URL query parameters
-  [**alpine-component**](alpine-component/README.md): A minimal Alpine.js plugin for creating and using web components
-  _tbc._

#### Installation

All plugins in this repository can be installed both, by installing it as a module or by including the respective unpkg.com link in your HTML markup.

##### Module

`$ pnpm add @ubermanio/alpine-<plugin>`

```js
// This is your index.js / main.js
import Alpine from 'alpinejs'
import Plugin from '@ubermanio/alpine-<plugin>

Alpine.plugin(Plugin)

// Do some more stuff

Alpine.start()
```

##### CDN

Simply replace `<plugin>` with the plugin you want to install and add this code to your HTML markup.

```html
<script src="https://unpkg.com/@ubermanio/alpine-<plugin>@latest/dist/plugin.min.js"></script>
```
