import React, { CSSProperties, ReactElement } from "react";
import { Children, PropsWithChildren } from "react";

import "./flex-grid.css";

export function FlexGrid(
  props: PropsWithChildren<{
    column: number;
    children: ReactElement[];
    className?: string;
    innerClassName?: string;
    proportion?: number[];
    style?: CSSProperties;
  }>
): JSX.Element {
  return (
    <div
      className={`flex-grid-container ${props.className}`}
      style={props.style}
    >
      {Children.map(props.children, (child, index) => {
        return props.innerClassName ? (
          <div key={`text-grid-${index}`} className={props?.innerClassName}>
            {child}
          </div>
        ) : (
          <div
            key={`text-grid-${index}`}
            style={{
              width: `${
                props.proportion ? props.proportion[index] : 100 / props.column
              }%`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
