import { cva, cx } from "class-variance-authority";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";

const SelectTheme = cva(
  "outline-none bg-gray-100 text-gray-500 py-2 px-3 rounded-md w-full"
);

export type SelectProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export default function Select(props: SelectProps) {
  return (
    <select {...props} className={cx(SelectTheme(), props.className)}></select>
  );
}
