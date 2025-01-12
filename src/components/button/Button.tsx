import { cva, cx, VariantProps } from "class-variance-authority";
import { HtmlHTMLAttributes, ReactNode } from "react";

export const ButtonTheme = cva("w-min rounded-sm text-nowrap py-2 px-3", {
  variants: {
    variant: {
      primary: "bg-primary text-white",
      destructive: "bg-red-400 text-white",
      successfully: "bg-green-600 text-white",
      warn: "bg-yellow-500 text-white",
    },
    size: {
      small: "text-xs ",
      medium: "text-sm",
      large: "text-md",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonTheme> & {
    children?: ReactNode;
  };

export default function Button(props: ButtonProps) {
  const { children, variant, size, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={cx(ButtonTheme({ variant, size }), buttonProps.className)}
    >
      {children}
    </button>
  );
}
