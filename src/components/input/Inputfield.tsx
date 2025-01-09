import { cva, cx, VariantProps } from "class-variance-authority";
import {
  DetailedHTMLProps,
  HtmlHTMLAttributes,
  InputHTMLAttributes,
} from "react";

export const InputfieldTheme = cva("w-full", {
  variants: {
    themeType: {
      text: "outline-none w-full px-3 py-2 rounded-sm text-gray-500  bg-gray-100",
      button:
        "px-3 py-2 rounded-sm w-full bg-primary text-white cursor-pointer hover:opacity-[0.9]",
    },
    buttonTheme: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
      danger: "bg-red-500 text-white",
      success: "bg-green-600 text-white",
      warning: "bg-yellow-500 text-white",
      info: "bg-blue-500 text-white",
      light: "bg-gray-100 text-gray-800",
      dark: "bg-gray-800 text-white",
    },
  },
});

export type InputfieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  VariantProps<typeof InputfieldTheme> & {
    error_message?: string;
    title?: string;
  };

export default function Inputfield(props: InputfieldProps) {
  const { buttonTheme, themeType, title, ...inputProps } = props;

  let theme: VariantProps<typeof InputfieldTheme> = { themeType: "button" };

  switch (props.type) {
    case "text":
    case "password":
    case "current-password":
      theme.themeType = "text";
      break;
    case "submit":
      theme.themeType = "button";
      theme.buttonTheme = props.buttonTheme || "primary";
      break;
  }

  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      {title && <p className="text-sm text-gray-600">{title}</p>}
      <input
        {...inputProps}
        className={cx(InputfieldTheme(theme), props.className)}
      />
      {props.error_message && (
        <span className="text-red-500 text-xs">{props.error_message}</span>
      )}
    </div>
  );
}
