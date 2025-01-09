import { ReactNode } from "react";
import FetchNavigation from "../fetch-navigation/FetchNavigation";
import Table from "../table/Table";
import TableBody from "../table/TableBody";
import TableHeader from "../table/TableHeader";

export type CompoundTableProps = {
  currentPage?: number;
  pageSize?: number;
  total?: number;
  rows: ReactNode[][];
  headers: ReactNode[];
  onNextClick?: () => void;
  onBeforeClick?: () => void;
  noRowItem?: ReactNode;
  className?: string;
};

export default function CompoundTable(props: CompoundTableProps) {
  let totalPage: number | undefined = undefined;
  if (props.total && props.pageSize) {
    totalPage = Math.ceil(props.total / props.pageSize);
  }
  return (
    <>
      <Table className={props.className}>
        <TableHeader data={props.headers} />
        {props.noRowItem ? (
          <tr className="text-center text-sm bg-white text-primary">
            <td colSpan={props.headers.length}>{props.noRowItem}</td>
          </tr>
        ) : (
          <TableBody data={props.rows} />
        )}
      </Table>
      {totalPage && props.currentPage && props.pageSize && props.total && (
        <FetchNavigation
          currentPage={props.currentPage}
          pageSize={props.pageSize}
          totalItem={props.total}
          totalPage={totalPage}
          onNextClick={() => {
            props.onNextClick && props.onNextClick();
          }}
          onBeforeClick={() => {
            props.onBeforeClick && props.onBeforeClick();
          }}
        />
      )}
    </>
  );
}
