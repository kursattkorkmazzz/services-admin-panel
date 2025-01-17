import { cx } from "class-variance-authority";

type DividerProps = {
  width?: number;
  className?: string;
};
export default function Divider(props: DividerProps) {
  return <hr className={cx(props.className)} />;
}
