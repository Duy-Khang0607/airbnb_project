import React from "react";
import { NavLink } from "react-router-dom";

type Props = {
  path: string;
  className: string;
  children: string | JSX.Element;
  onClick: () => void;
  disabled?: boolean;
};

export default function Button({
  path,
  className,
  children,
  onClick,
  disabled,
}: Props) {
  return (
    <NavLink to={path}>
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    </NavLink>
  );
}
