import { Component } from "solid-js";
import { spread } from "solid-js/dom";

type Props = JSX.CustomAttributes<SVGSVGElement> &
  JSX.SVGAttributes<SVGSVGElement> & { path: string };

export const Icon: Component<Props> = (props) => {
  return () => {
    const el = (
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
        {props.path}
      </svg>
    );
    spread(el as Element, props);
    return el;
  };
};
