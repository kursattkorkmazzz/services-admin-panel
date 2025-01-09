import { cva, cx } from "class-variance-authority";
import { HTMLAttributes } from "react";

const SelectTheme = cva(
  "outline-none bg-primary text-white py-2 px-3 rounded-md w-full"
);

export type SelectProps = HTMLAttributes<HTMLSelectElement>;

export default function Select(props: SelectProps) {
  return (
    <select {...props} className={cx(SelectTheme(), props.className)}></select>
  );
}
