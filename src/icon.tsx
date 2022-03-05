import { Component, JSX, splitProps } from "solid-js";

interface Props extends JSX.SvgSVGAttributes<SVGSVGElement> {
  /**
   * This is the path of the SVG
   */
  path: { path: Element | Element[] | string; outline: boolean };
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
 * ```tsx
 * import { arrowLeft } from '@amoutonbrady/solid-heroicons/outline'
 * import { arrowRight } from '@amoutonbrady/solid-heroicons/solid'
 *
 * const icon = <Icon path={arrowLeft} class="text-gray-900 h-6" />
 * const icon2 = <Icon path={arrowRight} class=text-gray-900 h-6" />
 * ```
 */
export const Icon: Component<Props> = (props) => {
  const [internal, external] = splitProps(props, ["path"]);

  return (
    <svg
      viewBox={internal.path.outline ? "0 0 24 24" : "0 0 20 20"}
      style={{
        fill: internal.path.outline ? "none" : "currentColor",
        stroke: internal.path.outline ? "currentColor" : "none",
      }}
      {...external}
    >
      {internal.path.path}
    </svg>
  );
};
