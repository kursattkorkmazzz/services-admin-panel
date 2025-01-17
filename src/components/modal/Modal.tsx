import { cva, cx, VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

const ModalTheme = cva(
  "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-40 flex items-center justify-center z-10",
  {
    variants: {
      status: {
        open: "visible",
        close: "hidden",
      },
    },
  }
);

export type ModalProps = VariantProps<typeof ModalTheme> & {
  children?: React.ReactNode;
  isOpen?: boolean;
  onClickBlackRegion?: Function;
  onClosebuttonClick?: Function;
  header?: string;
};

export default function Modal(props: ModalProps) {
  return (
    <div
      className={cx(ModalTheme({ status: props.isOpen ? "open" : "close" }))}
      onClick={(e) => {
        props.onClickBlackRegion && props.onClickBlackRegion();
      }}
    >
      <div
        className="flex flex-col bg-white p-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-4 justify-between items-center">
          {props.header ? (
            <h1 className="text-lg font-medium"> {props.header}</h1>
          ) : (
            <div className="w-full h-1"></div>
          )}

          {props.onClosebuttonClick && (
            <button
              onClick={() => {
                props.onClosebuttonClick && props.onClosebuttonClick();
              }}
            >
              <XIcon className="text-red-500" />
            </button>
          )}
        </div>

        {props.children}
      </div>
    </div>
  );
}
