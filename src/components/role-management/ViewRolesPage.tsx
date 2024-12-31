"use client";

import { GetRolesAction, UpdateRoleAction } from "@/actions/role/RoleActions";
import ResponseType from "@/lib/ResponseType";
import { useContext, useEffect, useState } from "react";
import IconButton from "../iconbutton/IconButton";
import { ClipboardList, PencilLine, Trash2 } from "lucide-react";
import Subheader from "../page/header/Subheader";
import CompoundTable from "../compound-table/CompoundTable";
import NotAuthorizedPage from "../not-authorized/NotAuthorizedPage";
import { ModalContext } from "@/providers/modal/ModalProvider";
import RoleEditPage from "./RoleEditPage";
import { Role, RoleArray } from "@/types/RoleTypes";
import { FieldValues } from "react-hook-form";
import { useAlertContext } from "@/providers/alert/AlertProvider";

export default function ViewRolesPage() {
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

  // Tüm rolleri çek. (Paging ve Limit işlemleri)
  const getRoles = () => {
    const access_token = localStorage.getItem("access_token") || "";

    GetRolesAction(page, limit, access_token)
      .then((response: ResponseType) => {
        let isReadRolePermission = false;
        if (response.error == "Permission denied.") {
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
        <IconButton strokeWidth={1} Icon={ClipboardList} />
        <IconButton
          strokeWidth={1}
          Icon={PencilLine}
          className="text-yellow-400"
          onClick={() => {
            modalContext.setModal(
              <RoleEditPage
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
        <IconButton strokeWidth={1} Icon={Trash2} className="text-red-400" />
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
        if (response.error === "Permission denied.") {
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

  return (
    <>
      <Subheader>Rol Listesi</Subheader>
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
        <NotAuthorizedPage body="Rolleri görüntülemek için yetkiniz bulunmamaktadır." />
      )}
    </>
  );
}
