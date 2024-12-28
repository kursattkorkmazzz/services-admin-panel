"use client";
import LoginPage from "@/app/login/page";
import { createContext, useEffect, useState } from "react";

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

  useEffect(() => {
    function checkToken() {
      const access_token = localStorage.getItem("access_token");
      const refresh_token = localStorage.getItem("refresh_token");
      set_access_token(access_token || undefined);
      set_refresh_token(refresh_token || undefined);
    }

    checkToken();
    window.addEventListener("storage", checkToken);
  }, []);

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
