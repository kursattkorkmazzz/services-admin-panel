import { ReactNode } from "react";
import FetchNavigation from "../fetch-navigation/FetchNavigation";
import Table from "../table/Table";
import TableBody from "../table/TableBody";
import TableHeader from "../table/TableHeader";

export type CompoundTableProps = {
  currentPage: number;
  pageSize: number;
  total: number;
  rows: ReactNode[][];
  headers: ReactNode[];
  onNextClick: () => void;
  onBeforeClick: () => void;
};

export default function CompoundTable(props: CompoundTableProps) {
  const totalPage = Math.ceil(props.total / props.pageSize);

  return (
    <>
      <Table>
        <TableHeader data={props.headers} />
        <TableBody data={props.rows} />
      </Table>
      <FetchNavigation
        currentPage={props.currentPage}
        totalPage={totalPage}
        pageSize={props.pageSize}
        totalItem={props.total}
        onNextClick={props.onNextClick}
        onBeforeClick={props.onBeforeClick}
      />
    </>
  );
}
