"use client";
import Alert from "@/components/alert/Alert";
import AlertReducer, {
  AlertArrayItemType,
  AlertType,
} from "@/reducers/AlertReducer";
import { v4 as uuidv4 } from "uuid";
import { useContext, createContext, ReactNode, useReducer } from "react";

export type AlertContextType = {
  create: (message: string, type: AlertType, seconds?: number) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export const useAlertContext = () => {
  const alertContext = useContext(AlertContext);

  if (!alertContext) {
    throw new Error(
      "useAlertContext has to be used within <AlertContext.Provider>"
    );
  }

  return alertContext;
};

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [alerts, dispatch] = useReducer(AlertReducer, []);

  const create = (message: string, type: AlertType, seconds: number = 3) => {
    const alert: AlertArrayItemType = {
      _id: uuidv4(),
      message: message,
      type: type || "info",
    };
    dispatch({
      type: "add",
      alert: alert,
    });
    setTimeout(() => {
      dispatch({
        type: "delete",
        alert: alert,
      });
    }, seconds * 1000);
  };

  return (
    <AlertContext.Provider
      value={{
        create: create,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          right: 5,
          bottom: 5,
          gap: 3,
        }}
      >
        {alerts.map((a, i) => {
          return (
            <Alert
              key={i}
              type={a.type}
              message={a.message}
              onCloseClick={() => {
                dispatch({
                  type: "delete",
                  alert: a,
                });
              }}
            />
          );
        })}
      </div>
      {children}
    </AlertContext.Provider>
  );
}
