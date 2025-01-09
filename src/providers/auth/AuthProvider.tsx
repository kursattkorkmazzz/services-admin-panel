"use client";
import { CheckSessionAction } from "@/actions/authentication/AuthentiationActions";
import LoginPage from "@/app/login/page";
import ResponseType from "@/lib/ResponseType";
import { createContext, useEffect, useState } from "react";
import { useAlertContext } from "../alert/AlertProvider";
import { CheckPermission } from "@/actions/authorization/AuthorizationActions";

type AuthContextType = {
  access_token: string | undefined;
  refresh_token: string | undefined;
  checkPermission: (operation_codes: string[]) => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({
  access_token: undefined,
  refresh_token: undefined,
  checkPermission: (op: string[]) => {
    return Promise.reject(new Error("Not implemented yet."));
  },
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [access_token, set_access_token] = useState<string | undefined>();
  const [refresh_token, set_refresh_token] = useState<string | undefined>();

  const alertContext = useAlertContext();

  useEffect(() => {
    checkAuthenticationHandler();
    window.addEventListener("storage", checkAuthenticationHandler);
  }, []);

  const checkAuthenticationHandler = () => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    if (access_token && refresh_token) {
      CheckSessionAction(access_token)
        .then((value: ResponseType) => {
          if (value.error) {
            console.log(value.error);
            return;
          }
          if (value.data.status === "valid") {
            set_access_token(access_token);
            set_refresh_token(refresh_token);
            alertContext.create("Giriş Başarılı. Hoşgeldiniz.", "success", 3);
          } else {
            alertContext.create(
              "Oturum süreniz dolmuştur. Lütfen tekrar giriş yapınız.",
              "info",
              3
            );
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } else {
      set_access_token(undefined);
      set_refresh_token(undefined);
    }
  };

  const checkPermission = async (operation_codes: string[]) => {
    if (!access_token) {
      checkAuthenticationHandler();
      return;
    }
    const response: ResponseType = await CheckPermission(
      access_token,
      operation_codes
    );

    if (response.error) {
      console.log(response.error);
      return ["denied"];
    }
    return response.data.access;
  };

  return (
    <AuthContext.Provider
      value={{
        access_token: access_token,
        refresh_token: refresh_token,
        checkPermission,
      }}
    >
      {access_token && refresh_token ? children : <LoginPage />}
    </AuthContext.Provider>
  );
}
