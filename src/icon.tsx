import { Component } from "solid-js";
import { spread, template, effect, setAttribute } from "solid-js/dom";

type Props = JSX.CustomAttributes<SVGSVGElement> &
  JSX.SVGAttributes<SVGSVGElement> & { path: string; outline?: boolean };

/**
 * The Icon helper is just a SVG wrapper that can take any attributes
 * an SVG element can take plus a special props named `path` that reprensent
 * a string with the path(s) to insert within the SVG element.
 *
 * It will take the parent CSS `color` value.
 *
 * @example
 * ```tsx"
 * import { arrowLeft } from '@amoutonbrady/solid-heroicons/outline'
 * import { arrowRight } from '@amoutonbrady/solid-heroicons/solid'
 *
 * const icon = <Icon path={arrowLeft} outline class="text-gray-900 h-6" />
 * const icon2 = <Icon path={arrowRight} class=text-gray-900 h-6" />
 * ```
 */
export const Icon: Component<Props> = (props) => {
  return () => {
    const el = template(`<svg fill="none" viewBox="0 0 24 24"></svg>`, 2);
    setAttribute(el, "fill", props.outline ? "none" : "currentColor");
    setAttribute(el, "stroke", props.outline ? "currentColor" : "none");
    effect(() => (el.innerHTML = props.path));
    spread(el, props);
    return el;
  };
};
