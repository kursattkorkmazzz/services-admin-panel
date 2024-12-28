import { AlertTheme } from "@/components/alert/Alert";
import { VariantProps } from "class-variance-authority";

export type AlertType = VariantProps<typeof AlertTheme>["type"];

export type AlertArrayItemType = {
  _id?: string;
  message: string;
  type: NonNullable<AlertType>;
};

export type AlertArrayType = AlertArrayItemType[];
export type AlertActionType = {
  type: "add" | "delete";
  [K: string]: any;
};
export default function AlertReducer(
  alerts: AlertArrayType,
  action: AlertActionType
): AlertArrayType {
  switch (action.type) {
    case "add":
      return AddAlert(alerts, action.alert);
    case "delete":
      return DeleteAlert(alerts, action.alert);
  }
}

function AddAlert(
  alerts: AlertArrayType,
  alert: AlertArrayItemType
): AlertArrayType {
  const newAlerts = [...alerts];
  newAlerts.push(alert);
  return newAlerts;
}

function DeleteAlert(
  alerts: AlertArrayType,
  alert: AlertArrayItemType
): AlertArrayType {
  return alerts.filter((a) => a._id !== alert._id);
}
