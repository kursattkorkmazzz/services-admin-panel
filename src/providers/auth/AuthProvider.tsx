"use client";
import { CheckSessionAction } from "@/actions/authentication/AuthentiationActions";
import LoginPage from "@/app/login/page";
import ResponseType from "@/lib/ResponseType";
import { createContext, useEffect, useState } from "react";
import { useAlertContext } from "../alert/AlertProvider";

type AuthContextType = {
  access_token: string | undefined;
  refresh_token: string | undefined;
};

export const AuthContext = createContext<AuthContextType>({
  access_token: undefined,
  refresh_token: undefined,
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

  return (
    <AuthContext.Provider
      value={{
        access_token: access_token,
        refresh_token: refresh_token,
      }}
    >
      {access_token && refresh_token ? children : <LoginPage />}
    </AuthContext.Provider>
  );
}
