import { Component } from "solid-js";
import { spread } from "solid-js/dom";

type Props = JSX.CustomAttributes<SVGSVGElement> &
  JSX.SVGAttributes<SVGSVGElement> & { path: string };

/**
 * The Icon helper is just a SVG wrapper that can take any attributes
 * an SVG element can take plus a special props named `path` that reprensent
 * a string with the path(s) to insert within the SVG element.
 *
 * It will take the parent CSS `color` value.
 *
 * @example
 * ```tsx
 * import { arrowLeft } from '@amoutonbrady/solid-heroicons/outline'
 *
 * const icon = <Icon path={arrowLeft} class="text-gray-900 h-6" />
 * ```
 */
export const Icon: Component<Props> = (props) => {
  return () => {
    const el = (
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        innerHTML={props.path}
      />
    );
    spread(el as Element, props);
    return el;
  };
};
