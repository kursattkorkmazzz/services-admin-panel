import { cva, cx, VariantProps } from "class-variance-authority";
import {
  DetailedHTMLProps,
  HtmlHTMLAttributes,
  InputHTMLAttributes,
} from "react";

export const InputfieldTheme = cva("", {
  variants: {
    themeType: {
      text: "outline-none w-full px-3 py-2 rounded-sm text-gray-500  bg-gray-100",
      button:
        "px-3 py-2 rounded-sm w-full bg-primary text-white cursor-pointer hover:opacity-[0.9]",
    },
  },
});

export type InputfieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error_message?: string;
};

export default function Inputfield(props: InputfieldProps) {
  let theme: VariantProps<typeof InputfieldTheme> = { themeType: "button" };

  switch (props.type) {
    case "text":
    case "password":
    case "current-password":
      theme.themeType = "text";
      break;
    case "submit":
      theme.themeType = "button";
      break;
  }

  return (
    <div>
      <input
        {...props}
        className={cx(InputfieldTheme(theme), props.className)}
      />
      {props.error_message && (
        <span className="text-red-500 text-xs">{props.error_message}</span>
      )}
    </div>
  );
}
