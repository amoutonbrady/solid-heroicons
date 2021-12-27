# Solid Heroicons

[Heroicons](https://github.com/tailwindlabs/heroicons) intergration for [solid-js](https://github.com/ryansolid/solid).

[Demo](https://codesandbox.io/s/solid-heroicons-f26s1?file=/src/index.tsx)

## Installation

```bash
$ npm install solid-heroicons
$ yarn add solid-heroicons
$ pnpm add solid-heroicons
```

## Usage

You can import every icon from heroicons [solid](https://github.com/tailwindlabs/heroicons/tree/master/solid) or [outline](https://github.com/tailwindlabs/heroicons/tree/master/outline) from `solid-heroicons/solid` and `solid-heroicons/outline` respectively. They are exported as camel case. Everything exported from those packages are just an object with the SVG path and a metadata to know whether it's been exported from solid or outline.
Those packages are generated automatically from [the heroicon repo](https://github.com/tailwindlabs/heroicons).

You can import the `Icon` component helper from `solid-heroicons`. This is just a `SVGElement` wrapper that accepts any props a regular SVG would plus a special props `path` for the icon you want to load in.

By default the `stroke` | `fill` attribute of the SVG is set to `currentColor` which means you can give any color you want to the SVG by setting the css `color` attribute on SVG or any parent higher.

```tsx
import { render } from "solid-js/dom";
import { Icon } from "solid-heroicons";
import { arrowLeft } from "solid-heroicons/solid";
import { arrowRight } from "solid-heroicons/outline";

const App = () => (
  <>
    <Icon path={arrowLeft} />
    <Icon path={arrowRight} />
  </>
);

render(() => App, document.getElementById("app"));
```
