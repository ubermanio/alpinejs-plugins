# alpine-param

### Install

`$ pnpm install @ubermanio/alpine-param`

### Usage

This plugin only adds a single `$param` magic to the Alpine.js runtime.

You can use it like following:

```html
<h1 :text="$param('queryText')"></h1>

<!-- or -->

<div
   class="fixed top-0 left-0 w-screen h-screen"
   :class="$param('color') === 'red' ? 'bg-red-500' : 'bg-blue-500'"
></div>
```
