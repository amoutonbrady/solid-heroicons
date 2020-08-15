# Solid Heroicons

[Heroicons](https://github.com/tailwindlabs/heroicons) intergration for [solid-js](https://github.com/ryansolid/solid).

## Installation

```bash
$ npm install @amoutonbrady/solid-heroicons
$ yarn add @amoutonbrady/solid-heroicons
$ pnpm add @amoutonbrady/solid-heroicons
```

## Usage

You can import every icon from heroicons [solid](https://github.com/tailwindlabs/heroicons/tree/master/solid) or [outline](https://github.com/tailwindlabs/heroicons/tree/master/outline) from `@amoutonbrady/solid-heroicons/solid` and `@amoutonbrady/solid-heroicons/outline` respectively. They are exported as camel case. Everything exported from those packages are just svg paths as string generated automatically.

You can import the `Icon` component helper from `@amoutonbrady/solid-heroicons`. This is just a SVGElement wrapper.

By default the `stroke` attribute of the SVG is set to `currentColor` which means you can give any color you want to the SVG by setting the css `color` attribute on SVG or any parent higher.

```tsx
import { render } from 'solid-js/dom'
import { Icon } from '@amoutonbrady/solid-heroicons';
import { arrowLeft } from '@amoutonbrady/solid-heroicons/solid;
import { arrowRight } from '@amoutonbrady/solid-heroicons/outline;

const App = () => <Icon path={arrowLeft} />

render(() => App, document.getElementById('app'))
```
