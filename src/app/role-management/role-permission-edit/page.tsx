"use client";
import { CheckPermission } from "@/actions/authorization/AuthorizationActions";
import {
  AddPermissionToRole,
  GetAllPermissions,
  GetPermissionsOfRoleAction,
  RemovePermissionFromRole,
} from "@/actions/role/PermissionActions";
import Button from "@/components/button/Button";
import CompoundTable from "@/components/compound-table/CompoundTable";
import Subheader from "@/components/page/header/Subheader";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { Permission, PermissionChangeType } from "@/types/PermissionTypes";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";

export default function PermissionManagementPage() {
  const [roleId, setRoleId] = useState<string | null>(null);
  const serachParam = useSearchParams();
  const router = useRouter();
  const alertContext = useAlertContext();
  const [allPermissions, setAllPermissions] = useState<
    (Permission & { isUserHas: boolean })[]
  >([]);
  const [rows, setRows] = useState<ReactNode[][]>([]);

  //let permissionChanges: PermissionChangeType[] = [];
  const [permissionChanges, setPermissionChanges] = useState<
    PermissionChangeType[]
  >([]);

  // Check if role_id is in the query string
  useEffect(() => {
    const roleId = serachParam.get("role_id");
    if (roleId) {
      setRoleId(roleId);
    } else {
      router.push("/role-management");
    }
  }, [serachParam]);

  // Fetch all permissions and permissions of the role and match them.
  useEffect(() => {
    if (!roleId) return;

    const access_roken = localStorage.getItem("access_token") || "";

    // Fetch all permissions
    GetAllPermissions(access_roken)
      .then((all_permissions_response) => {
        if (UIErrorHandler.isPermissionError(all_permissions_response)) {
          alertContext.create(
            "Yetki işlemleri için gerekli yetkiniz bulunmamaktadır. ",
            "error"
          );
          return;
        }
        if (all_permissions_response.data.permissions instanceof Array) {
          GetPermissionsOfRoleAction(roleId, access_roken)
            .then((role_permission_response) => {
              if (
                UIErrorHandler.isPermissionError(role_permission_response) ||
                UIErrorHandler.isPermissionError(all_permissions_response)
              ) {
                alertContext.create(
                  "Yetki işlemleri için gerekli yetkiniz bulunmamaktadır. ",
                  "error"
                );
                return;
              }

              const returned_rolePermissions =
                role_permission_response.data as Array<Permission>;
              const returned_allPermissions = all_permissions_response.data
                .permissions as Array<Permission>;

              const allPermissionsWithStatus: PermissionChangeType[] =
                returned_allPermissions.map((perm: Permission, i: number) => {
                  const isUserHas: boolean = returned_rolePermissions.find(
                    (rolePerm) => rolePerm.id === perm.id
                  )
                    ? true
                    : false;
                  return {
                    ...perm,
                    isUserHas,
                  };
                });
              setAllPermissions(allPermissionsWithStatus);
            })
            .catch((e) => {
              console.log(e);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [roleId]);

  useEffect(() => {
    setRows(
      allPermissions.map((perm: Permission & { isUserHas: boolean }) => {
        return [
          perm.name,
          perm.description,
          <input
            type="checkbox"
            defaultChecked={perm.isUserHas}
            onChange={(e) => handeCheckboxChange(perm, e.target.checked)}
          />,
        ];
      })
    );
  }, [allPermissions]);

  const handeCheckboxChange = (permission: Permission, status: boolean) => {
    setPermissionChanges((previousChanges) => {
      //console.log(permission.id);

      const isChangesExistAlready = previousChanges.find(
        (permChanged) => permChanged.id === permission.id
      );
      if (isChangesExistAlready) {
        return previousChanges.filter((p) => p.id !== permission.id);
      } else {
        return [...previousChanges, { ...permission, isUserHas: status }];
      }
    });
  };

  const saveHandler = () => {
    Promise.all(
      permissionChanges.map((permissionChange) => {
        const access_token = localStorage.getItem("access_token") || "";
        if (permissionChange.isUserHas) {
          return AddPermissionToRole(
            roleId!,
            permissionChange.id,
            access_token
          );
        } else {
          return RemovePermissionFromRole(
            roleId!,
            permissionChange.id,
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
    <div>
      <Subheader title="Rol Yetki Yönetimi" />

      <CompoundTable
        headers={["Yetki Adı", "Yetki Açıklaması", "Yetkiye Sahip Mi?"]}
        rows={rows}
        className="mt-5"
      />
      {permissionChanges.length > 0 && (
        <div className="flex flex-row gap-3 pt-5 w-full justify-center">
          <Button
            variant={"destructive"}
            onClick={() => {
              setPermissionChanges([]);
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
