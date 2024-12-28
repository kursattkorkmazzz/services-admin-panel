import { cva, cx, VariantProps } from "class-variance-authority";
import {
  AlertOctagonIcon,
  InfoIcon,
  OctagonAlert,
  OctagonAlertIcon,
  OctagonXIcon,
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
      },
    },
  }
);

export type AlertProps = VariantProps<typeof AlertTheme> & {
  message: string;
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
      iconNode = <OctagonAlertIcon strokeWidth={2} />;
      break;
  }

  return (
    <div className={cx(AlertTheme({ type: props.type }))}>
      {iconNode}
      {props.message}
    </div>
  );
}
