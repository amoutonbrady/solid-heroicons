import { Component, createEffect, splitProps } from "solid-js";
import { spread, template, setAttribute } from "solid-js/dom";

interface Props extends JSX.SvgSVGAttributes<SVGSVGElement> {
  /**
   * This is the path of the SVG
   */
  path: { path: string; outline: boolean };
}

/**
 * The Icon helper is just a SVG wrapper that can take any attributes
 * an SVG element can take plus a special props named `path` that reprensent
 * a string with the path(s) to insert within the SVG element.
 *
 * It will take the parent CSS `color` value as fill/stroke depending on
 * whether it's imported from `outline` or `solid`.
 *
 * @example
 * ```tsx"
 * import { arrowLeft } from '@amoutonbrady/solid-heroicons/outline'
 * import { arrowRight } from '@amoutonbrady/solid-heroicons/solid'
 *
 * const icon = <Icon path={arrowLeft} class="text-gray-900 h-6" />
 * const icon2 = <Icon path={arrowRight} class=text-gray-900 h-6" />
 * ```
 */
export const Icon: Component<Props> = (props) => {
  const el = template(`<svg viewBox="0 0 24 24"></svg>`, 2);
  const [internal, external] = splitProps(props, ["path"]);
  spread(el, external, true);

  createEffect(() => {
    setAttribute(el, "fill", internal.path.outline ? "none" : "currentColor");
    setAttribute(el, "stroke", internal.path.outline ? "currentColor" : "none");
  });

  createEffect(() => {
    el.innerHTML = internal.path.path;
  });

  return el;
};
