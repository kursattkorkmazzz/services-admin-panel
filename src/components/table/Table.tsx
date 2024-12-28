import { cva, cx } from "class-variance-authority";

export type TableProps = {
  children: React.ReactNode;
};

export const TableTheme = cva("w-full bg-primary rounded-sm text-white");

export default function Table(props: TableProps) {
  return <table className={cx(TableTheme())}>{props.children}</table>;
}
