import { cva, cx } from "class-variance-authority";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

export const TextareaTheme = cva(
  "outline-none w-full px-3 py-2 rounded-sm text-gray-500  bg-gray-100"
);

export type InputfieldProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  title?: string;
};

export default function Textarea(props: InputfieldProps) {
  return (
    <div className="flex flex-col gap-1 items-start justify-start">
      {props.title && <p className="text-sm text-gray-600">{props.title}</p>}
      <textarea
        {...props}
        className={cx(TextareaTheme(), props.className)}
      ></textarea>
    </div>
  );
}
