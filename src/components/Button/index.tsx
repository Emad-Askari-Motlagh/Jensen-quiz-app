import React from "react";
import "./Button.scss";

export default function Button({
  label,
  width,
  onClick,
}: {
  label: string;
  width: string;
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button onClick={onClick} style={{ width }} className="button-wrapper">
      {label}
    </button>
  );
}
