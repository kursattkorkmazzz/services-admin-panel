import { cva, cx, VariantProps } from "class-variance-authority";
import { HtmlHTMLAttributes, ReactNode } from "react";

export const ButtonTheme = cva(
  "w-min rounded-sm py-2 px-3 text-nowrap text-sm",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        destructive: "bg-red-400 text-white",
        successfully: "bg-green-600 text-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonTheme> & {
    children?: ReactNode;
  };

export default function Button(props: ButtonProps) {
  const { children, variant, ...buttonProps } = props;
  return (
    <button
      {...buttonProps}
      className={cx(ButtonTheme({ variant }), buttonProps.className)}
    >
      {children}
    </button>
  );
}
