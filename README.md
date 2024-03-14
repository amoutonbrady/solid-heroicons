# Solid Heroicons

> :warning: **This is not an official implementation**: All credits goes out to the Heroicons and Tailwind CSS team.

[Heroicons](https://github.com/tailwindlabs/heroicons) integration for [Solid](https://github.com/ryansolid/solid) with a twist.

[Demo](https://codesandbox.io/s/solid-heroicons-f26s1?file=/src/index.tsx)

## Installation

```bash
$ npm install solid-heroicons
$ yarn add solid-heroicons
$ pnpm add solid-heroicons
```

## Usage

You can import every icon from heroicons [solid](https://github.com/tailwindlabs/heroicons/tree/master/src/24/solid), [outline](https://github.com/tailwindlabs/heroicons/tree/master/src/24/outline), [solid-mini](https://github.com/tailwindlabs/heroicons/tree/master/src/20/solid), or [solid-micro](https://github.com/tailwindlabs/heroicons/tree/master/src/16/solid) from `solid-heroicons/solid`, `solid-heroicons/outline`, `solid-heroicons/solid-mini`, and `solid-heroicons/solid-micro`, respectively. 
They are exported as camel case. Everything exported from those packages are just an object with the SVG path and a metadata to know whether it's been exported from the solid, outline or mini variant.

Those packages are generated automatically via a script from [the heroicon repo](https://github.com/tailwindlabs/heroicons).

You can import the `Icon` component helper from `solid-heroicons`. This is just a `SVGElement` wrapper that accepts any props a regular SVG would plus a special props `path` for the icon you want to load in.

By default the `stroke` | `fill` attribute of the SVG is set to `currentColor` which means you can give any color you want to the SVG by setting the css `color` attribute on SVG or any parent higher.

```tsx
import { render } from "solid-js/dom";
import { Icon } from "solid-heroicons";
import { arrowLeft } from "solid-heroicons/solid";
import { arrowRight } from "solid-heroicons/outline";
import { arrowDown } from "solid-heroicons/solid-mini";
import { arrowUp } from "solid-heroicons/solid-micro";

const App = () => (
  <>
    <Icon path={arrowLeft} style="width: 24px; color: blue" />
    <Icon path={arrowRight} style="width: 24px; color: green" />
    <Icon path={arrowDown} style="width: 20px; color: yellow" />
    <Icon path={arrowUp} style="width: 16px; color: red" />
  </>
);

render(() => App, document.getElementById("app"));
```
