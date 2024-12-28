"use client";
import SidebarButton from "./SidebarButton";
import "./Sidebar.css";
import { cx } from "class-variance-authority";
import { LogoutAction } from "@/actions/authentication/AuthentiationActions";
import { MouseEvent } from "react";
import MyErrorCodes from "@/lib/error/MyErrorCodes";

export default function SidebarPanel() {
  const logoutHandler = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      window.dispatchEvent(new StorageEvent("storage"));
      return;
    }
    LogoutAction(access_token)
      .then((resultCode: number) => {
        switch (resultCode) {
          case 200:
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.dispatchEvent(new StorageEvent("storage"));
            break;
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  return (
    <div className="flex flex-col h-full bg-primary">
      <div
        className={cx(
          "flex flex-col  py-4 px-2 gap-2 h-full",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <SidebarButton href={"/"} pathSelector="/">
          Hoşgeldiniz
        </SidebarButton>
        <SidebarButton
          href={"/role-management"}
          pathSelector="/role-management"
        >
          Rol ve Yetki Yönetimi
        </SidebarButton>
        <SidebarButton href={"/"} pathSelector="/team-member">
          Ekip Üyeleri
        </SidebarButton>
        <div className="h-full w-1" />
        <SidebarButton href={""} pathSelector="/exit" onClick={logoutHandler}>
          Çıkış Yap
        </SidebarButton>
      </div>
    </div>
  );
}
