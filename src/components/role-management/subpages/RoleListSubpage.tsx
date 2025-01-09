"use client";
import Button from "@/components/button/Button";
import CompoundTable from "@/components/compound-table/CompoundTable";
import NotAuthorizedPage from "@/components/not-authorized/NotAuthorizedPage";
import Subheader from "@/components/page/header/Subheader";
import { useContext, useEffect, useState } from "react";
import { Role, RoleArray } from "@/types/RoleTypes";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ModalContext } from "@/providers/modal/ModalProvider";
import {
  CreateRoleAction,
  DeleteRoleAction,
  GetRolesAction,
  RoleCreateType,
  UpdateRoleAction,
} from "@/actions/role/RoleActions";
import ResponseType from "@/lib/ResponseType";
import IconButton from "@/components/iconbutton/IconButton";
import { ClipboardList, PencilLine, Trash2 } from "lucide-react";
import { FieldValues } from "react-hook-form";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import RoleAddAndEditPage from "../subpage-components/RoleAddAndEditSubpageComponent";
import { useRouter } from "next/navigation";

export default function RoleListSubpage() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [roles, setRoles] = useState<RoleArray>([]);

  // Rol görüntüleme yetkisi bilgisini tutar.
  const [isReadRolePermission, setIsReadRolePermission] =
    useState<boolean>(false);

  const alertContext = useAlertContext();
  const modalContext = useContext(ModalContext);
  const router = useRouter();
  // Tüm rolleri çek. (Paging ve Limit işlemleri)
  const getRoles = () => {
    const access_token = localStorage.getItem("access_token") || "";

    GetRolesAction(access_token, page, limit)
      .then((response: ResponseType) => {
        let isReadRolePermission = false;
        if (UIErrorHandler.isPermissionError(response)) {
          isReadRolePermission = false;
        } else {
          isReadRolePermission = true;
        }
        setIsReadRolePermission(isReadRolePermission);
        if (response.data && isReadRolePermission) {
          const { page, pageSize, roles, total } = response.data;

          const totalPage = Math.ceil(total / pageSize);

          setTotalPage(totalPage);
          setPage(page);
          setLimit(pageSize);
          setTotal(total);

          if (roles instanceof Array) {
            setRoles(
              roles.map((role) => {
                return role;
              })
            );
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // Sonraki sayfaya gitmek için kullanılır.
  const nextPageButtonHandler = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  // Önceki sayfaya gitmek için kullanılır.
  const beforePageButtonHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Sayfa yüklendiğinde rolleri çek.
  useEffect(() => {
    getRoles();
  }, [page]);

  // Tablodaki işlemler için butonları oluşturur.
  const getOperationButtons = (role: Role) => {
    return (
      <div className="flex flex-row gap-3">
        <IconButton
          strokeWidth={1}
          Icon={ClipboardList}
          className="text-blue-300"
          onClick={() => {
            router.push(
              `/role-management/role-permission-edit?role_id=${role.id}`
            );
          }}
        />
        <IconButton
          strokeWidth={1}
          Icon={PencilLine}
          className="text-yellow-400"
          onClick={() => {
            modalContext.setModal(
              <RoleAddAndEditPage
                role={role}
                editMode
                onSubmitHandler={(data) => {
                  editRoleHandler(role, data);
                }}
              />
            );
            modalContext.setModalHeader("Rol Düzenleme");
            modalContext.showModal();
          }}
        />
        <IconButton
          strokeWidth={1}
          Icon={Trash2}
          className="text-red-400"
          onClick={() => {
            deleteRoleHandler(role);
          }}
        />
      </div>
    );
  };

  // Rol güncelleme işlemlerini ele alır.
  function editRoleHandler(original_role: Role, changed_role: FieldValues) {
    modalContext.hideModal();
    UpdateRoleAction(
      {
        id: original_role.id,
        name: changed_role.role_name,
        description: changed_role.role_description,
      },
      localStorage.getItem("access_token") || ""
    )
      .then((response: ResponseType) => {
        if (response.data) {
          alertContext.create("Rol başarıyla güncellendi.", "success", 3);
          getRoles();
        }
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Rol güncelleme için gerekli yetkiniz bulunmamaktadır.",
            "error",
            3
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // Rol silme işlemlerini ele alır.
  function deleteRoleHandler(role: Role) {
    DeleteRoleAction(role.id, localStorage.getItem("access_token") || "")
      .then((response: ResponseType) => {
        if (response.data) {
          alertContext.create("Rol başarıyla silindi.", "success", 3);
          getRoles();
        }
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Rol silme için gerekli yetkiniz bulunmamaktadır.",
            "error"
          );
        }
        if (
          response.error === "This role cannot be delete. It is restricted."
        ) {
          alertContext.create(
            "Bu rol silinemez. Sistem tarafından engellenmektedir.",
            "error"
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function createRoleHandler(role: RoleCreateType) {
    modalContext.hideModal();
    CreateRoleAction(role, localStorage.getItem("access_token") || "")
      .then((response) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Rol oluşturma için yetkiniz bulunmamaktadır.",
            "error"
          );
          return;
        }
        if (response.data) {
          alertContext.create("Rol başarıyla oluşturuldu.", "success", 3);
          getRoles();
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      <Subheader
        title="Rol Listesi"
        description="Buradan tüm rollerin listesini görüntüleyebilir, düzenleyebilir, silebilir ve istediğiniz rollere yetki ataması yapabilirsiniz."
      />
      <div className="w-full flex justify-end">
        <Button
          variant={"successfully"}
          onClick={() => {
            modalContext.setModal(
              <RoleAddAndEditPage
                editMode={false}
                onSubmitHandler={(data) => {
                  createRoleHandler({
                    name: data.role_name,
                    description: data.role_description,
                  });
                }}
              />
            );
            modalContext.setModalHeader("Rol Oluşturma");
            modalContext.showModal();
          }}
        >
          Yeni Rol Oluştur
        </Button>
      </div>
      {isReadRolePermission ? (
        <CompoundTable
          currentPage={page}
          headers={["İsim", "Açıklama", "İşlemler"]}
          rows={
            isReadRolePermission
              ? roles.map((role) => {
                  return [
                    role.name,
                    role.description,
                    getOperationButtons(role),
                  ];
                })
              : []
          }
          onBeforeClick={beforePageButtonHandler}
          onNextClick={nextPageButtonHandler}
          pageSize={limit}
          total={total}
        />
      ) : (
        <NotAuthorizedPage />
      )}
    </>
  );
}
