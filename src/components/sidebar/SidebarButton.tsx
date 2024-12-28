"use client";
import { cva, cx, VariantProps } from "class-variance-authority";
import { LockIcon } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { HtmlHTMLAttributes, ReactNode } from "react";

// Themming
const SidebarButtonTheme = cva("p-2 rounded-sm  cursor-pointer", {
  variants: {
    status: {
      normal: "bg-secondary text-white",
      active: "bg-accent text-white",
    },
    hoverEffect: {
      true: "hover:bg-accent hover:text-white",
      false: null,
    },
    disabled: {
      true: "bg-gray-600 cursor-default",
      false: null,
    },
  },
  defaultVariants: {
    status: "normal",
    hoverEffect: true,
    disabled: false,
  },
});

export type ButtonProps = LinkProps &
  VariantProps<typeof SidebarButtonTheme> & {
    children?: ReactNode;
    pathSelector?: string;
    classname?: string;
  };
export default function SidebarButton(props: ButtonProps) {
  const { pathSelector, disabled, hoverEffect, status, ...buttonProps } = props;

  const pathname = usePathname();

  return (
    <Link
      {...buttonProps}
      className={cx(
        SidebarButtonTheme({
          hoverEffect: disabled ? false : hoverEffect,
          status: pathSelector === pathname ? "active" : status,
          disabled: disabled,
        }),
        props.classname
      )}
    >
      {props.children}
    </Link>
  );
}
