# alpine-component

### Install

`$ pnpm install @ubermanio/alpine-component`

### Usage

#### Define a component

> ⚠️ Please be aware that most browsers will throw an error when trying to name a web component with a reserved HTML5 tag name.

```html
<template x-component="text-field">
   <input class="px-4 py-2 border-2 rounded-md focus:outline-none" />
</template>
```

#### Use a component

```html
<text-field />
```

#### Pass props to a component

All props provided on the web component instance will get passed to the component definition template.

```html
<text-field placeholder="Hello world" @change="console.log" />
```

will resolve to

```html
<text-field>
   <input
      class="px-4 py-2 border-2 rounded-md focus:outline-none"
      placeholder="Hello world"
      @change="console.log"
   />
</text-field>
```

#### Slots ( / children)

You can use slots to define entry points to which the children should get mounted to.

```html
<template x-component="main-button">
   <button class="flex items-center justify-center gap-2 px-4 py-2">
      <slot name="label" />
   </button>
</template>
```

```html
<main-button>
   <span slot="label">Click me</span>
</main-button>
```

You can also use multiple `slot`s inside a component.

```html
<main-button>
   <span slot="label">Click me</span>
   <slot name="icon"></slot>
   <!-- ... -->
</main-button>
```

#### Working with custom props

When working with custom props (e.g. for specifying a buttons variant), you may use the `$attr()` magic helper to retrieve passes props inside the component definition.

```html
<template x-component="main-button">
   <button
      class="flex items-center justify-center gap-2 px-4 py-2 rounded-md"
      :class="$attr('variant') === 'primary' ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-500'"
   >
      <slot name="label" />
   </button>
</template>
```

And then pass the props to the component by using the `x-prop:<value>` directive.

```html
<main-button x-prop:variant="primary">
   <span slot="label">Click me</span>
</main-button>
```

will resolve to

```html
<main-button x-prop:variant="primary">
   <button class="[...] bg-blue-500 text-white">
      <slot name="label">
         <span slot="label">Click me</span>
      </slot>
   </button>
</main>
```
