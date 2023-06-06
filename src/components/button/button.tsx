import React from "react";

import "./button.css";

export function Button(props: {
  className?: string;
  activeClassName?: string;
  text: string;
  active?: boolean;
  onClick: (v: string) => void;
}): JSX.Element {
  return (
    <div
      className={`button-container ${props.className} ${
        props.active
          ? props.activeClassName
            ? props.activeClassName
            : "button-active"
          : ""
      }`}
      onClick={() => props.onClick(props.text)}
    >
      <div className="button-text">{props.text}</div>
    </div>
  );
}
