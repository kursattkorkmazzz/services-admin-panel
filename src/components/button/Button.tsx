import { cva, VariantProps } from "class-variance-authority";
import { HtmlHTMLAttributes, ReactNode } from "react";

export const ButtonTheme = cva("", {
  variants: {
    variant: {
      primary: "",
      destructive: "",
      successfully: "",
      outline: "",
      ghost: "",
    },
  },
});

export type ButtonProps = HtmlHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof ButtonTheme> & {
    children?: ReactNode;
  };

export default function Button(props: ButtonProps) {
  return <button {...props} />;
}
