import { cva, cx } from "class-variance-authority";
import { MenuIcon, LucideIcon } from "lucide-react";
import React, { HtmlHTMLAttributes } from "react";

export type IconButtonProps = HtmlHTMLAttributes<HTMLButtonElement> & {
  Icon: LucideIcon;
  strokeWidth?: number;
};

const IconButtonTheme = cva(
  "relative w-min h-min bg-transparent rounded-full cursor-pointer"
);

export default function IconButton(props: IconButtonProps) {
  const { strokeWidth, Icon, ...buttonProps } = props;
  return (
    <button {...buttonProps} className={cx(IconButtonTheme(), props.className)}>
      <Icon strokeWidth={strokeWidth} />
    </button>
  );
}
