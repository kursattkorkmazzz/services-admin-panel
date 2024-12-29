import { cva, cx, VariantProps } from "class-variance-authority";
import {
  AlertOctagonIcon,
  CircleCheck,
  InfoIcon,
  X,
  XOctagon,
} from "lucide-react";
import { ReactNode } from "react";

export const AlertTheme = cva(
  "flex flex-row gap-3 py-3 px-5 h-min rounded-md",
  {
    variants: {
      type: {
        info: "bg-blue-600 text-white",
        warning: "bg-yellow-400 text-white",
        error: "bg-red-500 text-white",
        success: "bg-green-500 text-white",
      },
    },
  }
);

export type AlertProps = VariantProps<typeof AlertTheme> & {
  message: string;
  onCloseClick?: () => void;
};

export default function Alert(props: AlertProps) {
  let iconNode: ReactNode = undefined;

  switch (props.type) {
    case "info":
      iconNode = <InfoIcon strokeWidth="2" />;
      break;
    case "warning":
      iconNode = <AlertOctagonIcon strokeWidth={"2"} />;
      break;
    case "error":
      iconNode = <XOctagon strokeWidth={2} />;
      break;
    case "success":
      iconNode = <CircleCheck strokeWidth={2} />;
  }

  return (
    <div className={cx(AlertTheme({ type: props.type }))}>
      {iconNode}
      {props.message}
      <X
        className="cursor-pointer"
        onClick={props.onCloseClick}
        strokeWidth={2}
      />
    </div>
  );
}
