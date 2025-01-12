import { cx } from "class-variance-authority";
import {
  CSSProperties,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  TdHTMLAttributes,
} from "react";

export type TableBodyProps = {
  data: React.ReactNode[][];
  tdAttributes?: TdHTMLAttributes<HTMLTableCellElement>[] | undefined;
};
export default function TableBody(props: TableBodyProps) {
  return (
    <tbody>
      {props.data.map((row, i1) => {
        return (
          <tr key={i1}>
            {row.map((data, i2) => {
              const { className, ...tdProps } = props.tdAttributes
                ? props.tdAttributes[i2]
                : { className: undefined };

              const combinedClassName = cx(
                "px-3 py-4 font-md text-sm",
                className
              );
              return (
                <td
                  key={i2}
                  {...(props.tdAttributes && props.tdAttributes[i2])}
                  className={combinedClassName}
                >
                  {data}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
