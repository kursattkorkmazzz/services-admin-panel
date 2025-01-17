"use client";
import { GetAllUsersAction } from "@/actions/user/UserActions";
import AvatarImage from "@/components/avatar-image/AvatarImage";
import CompoundTable from "@/components/compound-table/CompoundTable";
import IconButton from "@/components/iconbutton/IconButton";
import Subheader from "@/components/page/header/Subheader";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import ResponseType from "@/lib/ResponseType";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ModalContext } from "@/providers/modal/ModalProvider";
import { User } from "@/types/UserTypes";
import { EllipsisVertical } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import ProfileModal from "./profile-modal/ProfileModal";
import Button from "@/components/button/Button";
import NewUserModal from "./new-user-modal/NewUserModal";
export default function UserManagementPage() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  const alertContext = useAlertContext();
  const modalContext = useContext(ModalContext);

  const getUsers = () => {
    const access_token = localStorage.getItem("access_token") || "";

    GetAllUsersAction(access_token, page, limit)
      .then((response: ResponseType) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Kullanıcıları görüntülemek için gerekli yetkiniz bulunmamaktadır. ",
            "error"
          );
          return;
        }
        if (response.data.users instanceof Array) {
          setAllUsers(response.data.users);
          setTotal(response.data.total);
          return;
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const operationButtons = (user_id: string) => {
    const iconStroke: number = 1.5;
    return (
      <IconButton
        strokeWidth={iconStroke}
        Icon={EllipsisVertical}
        className="text-primary"
        onClick={() => {
          modalContext.setModalHeader("Kullanıcı Profili");
          modalContext.setModal(
            <ProfileModal
              user_id={user_id}
              onProfileUpdated={() => {
                getUsers();
              }}
            />
          );
          modalContext.showModal();
        }}
      />
    );
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

  return (
    <div>
      <Subheader
        title="Kullanıcılar"
        description="Burada tüm kullanıcıların listesini görebilirsiniz."
      />
      <div className="flex w-full justify-end">
        <Button
          variant={"successfully"}
          size={"small"}
          onClick={() => {
            modalContext.setModalHeader("Yeni Kullanıcı");
            modalContext.setModal(
              <NewUserModal
                onCreated={() => {
                  getUsers();
                }}
              />
            );
            modalContext.showModal();
          }}
        >
          Yeni Kullanıcı
        </Button>
      </div>
      <CompoundTable
        className="mt-5"
        headers={["Kullanıcı", "İşlemler"]}
        rows={allUsers.map((user) => {
          return [
            <div className="flex flex-row gap-2 items-center">
              <AvatarImage photo_url={user.photo_url} />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row gap-1 text-sm font-medium">
                  <p>{user.firstname}</p>
                  <p>{user.lastname}</p>
                </div>
                <p className="text-xs">
                  {user.email} - {user.Roles[0]?.name}
                </p>
              </div>
            </div>,
            operationButtons(user.id),
          ];
        })}
        tdAttributes={[
          { className: "w-full" },
          { className: "w-min text-center" },
        ]}
        currentPage={page}
        pageSize={limit}
        total={total}
        onBeforeClick={beforePageButtonHandler}
        onNextClick={nextPageButtonHandler}
      />
    </div>
  );
}
