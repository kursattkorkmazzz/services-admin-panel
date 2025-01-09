import IconButton from "../iconbutton/IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export type FetchNavigationProps = {
  currentPage: number;
  totalPage: number;
  totalItem: number;
  pageSize: number;
  onBeforeClick?: () => void;
  onNextClick?: () => void;
};

export default function FetchNavigation(props: FetchNavigationProps) {
  const range = [
    (props.currentPage - 1) * props.pageSize + 1,
    Math.min(props.currentPage * props.pageSize, props.totalItem),
  ];
  return (
    <div className="flex flex-col py-2 justify-center items-center text-primary gap-5">
      <p className="text-xs font-light">
        {props.totalItem} taneden {range[0]}-{range[1]} arası görüntüleniyor.
      </p>
      <div className=" flex flex-row gap-6">
        <IconButton Icon={ChevronLeftIcon} onClick={props.onBeforeClick} />
        <div className="flex flex-row gap-1">
          <p>{props.currentPage}</p>
          <p>/</p>
          <p>{props.totalPage}</p>
        </div>
        <IconButton Icon={ChevronRightIcon} onClick={props.onNextClick} />
      </div>
    </div>
  );
}
