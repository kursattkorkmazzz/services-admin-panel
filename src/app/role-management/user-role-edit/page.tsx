"use client";

import {
  AddRoleToUserAction,
  DeleteRoleFromUserAction,
  GetRolesAction,
} from "@/actions/role/RoleActions";
import { GetAnyUserAction } from "@/actions/user/UserActions";
import Button from "@/components/button/Button";
import CompoundTable from "@/components/compound-table/CompoundTable";
import Subheader from "@/components/page/header/Subheader";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import ResponseType from "@/lib/ResponseType";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { Role, RoleChangeType } from "@/types/RoleTypes";
import { User } from "@/types/UserTypes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function UserRoleEditPage() {
  const searchParams = useSearchParams();
  const [userId, _] = useState(searchParams.get("user_id"));
  const router = useRouter();
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [userInfo, setUserInfo] = useState<User>();
  const [roleChanges, setRoleChanges] = useState<RoleChangeType[]>([]);

  const [rows, setRows] = useState<ReactNode[][]>([]);

  const alertContext = useAlertContext();
  // Check user_id is exist or not.
  useEffect(() => {
    if (!userId) {
      router.push("/role-management");
    }
  }, []);

  // Load all roles and role of user.
  useEffect(() => {
    if (!userId) return;

    // Fetch all roles
    GetRolesAction(localStorage.getItem("access_token") || "").then(
      (response: ResponseType) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Rolleri görüntülemek için gerekli yetkilere sahip değilsin.",
            "error"
          );
          router.push("/role-management");
          return;
        }

        if (response.data.roles instanceof Array) {
          setAllRoles(response.data.roles);
        }
      }
    );
    // Fetch roles of user

    GetAnyUserAction(userId, localStorage.getItem("access_token") || "")
      .then((response) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Kullanıcıyı görüntülemek için yetkiniz yok",
            "error"
          );
          router.push("/role-management");
          return;
        }

        if (response.data) {
          setUserInfo(response.data);
          return;
        }
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [userId]);

  useEffect(() => {
    if (!userInfo) return;
    setRows(
      allRoles.map((role: Role) => {
        const isChecked: boolean = userInfo.Roles.find((r) => r.id === role.id)
          ? true
          : false;

        return [
          role.name,
          role.description,
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onChange={(e) => handeCheckboxChange(role, e.target.checked)}
          />,
        ];
      })
    );
  }, [allRoles]);

  const handeCheckboxChange = (role: Role, status: boolean) => {
    setRoleChanges((previousChanges) => {
      const isChangesExistAlready = previousChanges.find(
        (roleChanged) => roleChanged.id === role.id
      );
      if (isChangesExistAlready) {
        return previousChanges.filter((r) => r.id !== role.id);
      } else {
        return [...previousChanges, { ...role, isUserHas: status }];
      }
    });
  };

  const saveHandler = () => {
    Promise.all(
      roleChanges.map((roleChange) => {
        const access_token = localStorage.getItem("access_token") || "";
        if (roleChange.isUserHas) {
          return AddRoleToUserAction(roleChange.id, userInfo!.id, access_token);
        } else {
          return DeleteRoleFromUserAction(
            roleChange.id,
            userInfo!.id,
            access_token
          );
        }
      })
    )
      .then((response) => {
        if (response.every((res) => res.data === "Success")) {
          router.push("/role-management");
          alertContext.create(
            "Yetki değişiklikleri başarıyla kaydedildi.",
            "success"
          );
        } else {
          if (response.some((res) => UIErrorHandler.isPermissionError(res))) {
            alertContext.create(
              "Yetki değişiklikleri yapabilmek için yetkiniz bulunmamaktadır.",
              "error"
            );
          } else {
            alertContext.create(
              "Bazı yetki değişiklikleri kaydedilirken bir hata oluştu.",
              "error"
            );
          }
          router.push("/role-management");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div className="flex flex-col gap-3">
      <Subheader
        title="Rol Güncelleme"
        description="Bu sayfada kullanıcıya ait rollerini değiştirebilirsin. Yapman gereken olmasını istediğin rolleri seçmek istemediklerini kaldırmak."
      />
      <CompoundTable
        headers={["Rol Adı", "Rol Açıklaması", "Onay"]}
        rows={rows}
      />
      {roleChanges.length > 0 && (
        <div className="flex flex-row gap-3 pt-5 w-full justify-center">
          <Button
            variant={"destructive"}
            onClick={() => {
              setRoleChanges([]);
              router.push("/role-management");
            }}
          >
            İptal Et
          </Button>
          <Button variant={"successfully"} onClick={saveHandler}>
            Kaydet
          </Button>
        </div>
      )}
    </div>
  );
}
