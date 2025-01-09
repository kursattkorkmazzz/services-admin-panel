"use client";
import { GetAllUsersAction } from "@/actions/user/UserActions";
import CompoundTable from "@/components/compound-table/CompoundTable";
import IconButton from "@/components/iconbutton/IconButton";
import NotAuthorizedPage from "@/components/not-authorized/NotAuthorizedPage";
import Subheader from "@/components/page/header/Subheader";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import { Role } from "@/types/RoleTypes";
import { User } from "@/types/UserTypes";
import { PencilLine } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserRoleManage() {
  const [getAllUserPermission, setGetAllUserPermission] =
    useState<boolean>(false);

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const router = useRouter();
  useEffect(() => {
    GetAllUsersAction(localStorage.getItem("access_token") || "")
      .then((response) => {
        if (UIErrorHandler.isPermissionError(response)) {
          setGetAllUserPermission(false);
        } else {
          setGetAllUserPermission(true);
          if (response.data.users instanceof Array) {
            setAllUsers(response.data.users);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Tablodaki işlemler için butonları oluşturur.
  const getOperationButtons = (user_id: string) => {
    return (
      <div className="flex flex-row gap-3">
        <IconButton
          strokeWidth={1}
          Icon={PencilLine}
          className="text-yellow-400"
          onClick={() => {
            router.push(`/role-management/user-role-edit?user_id=${user_id}`);
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-5 mt-10">
      <Subheader
        title="Kullanıcılar ve Rolleri"
        description="Kullanıcılarınızın rollerini düzenleyebilirsiniz."
      />
      {getAllUserPermission ? (
        <CompoundTable
          headers={["Resim", "İsim", "Soyisim", "Email", "Roller", "İşlemler"]}
          rows={allUsers.map((user, i) => {
            return [
              <Image
                className="object-cover rounded-sm"
                src={user.photo_url || "/images/no-img.jpg"}
                alt="Kullanıcı resmi"
                style={{
                  width: "70px",
                  height: "70px",
                }}
                width={70}
                height={70}
              />,
              user.firstname,
              user.lastname,
              user.email,
              <div key={i} className="flex flex-col gap-1">
                {user.Roles.map((role: Role, ri: number) => {
                  return <p key={ri}>{role.name}</p>;
                })}
              </div>,
              getOperationButtons(user.id),
            ];
          })}
        />
      ) : (
        <NotAuthorizedPage body="Kullanıcıları görüntülemek için gerekli yetkiniz bulunmamaktadır." />
      )}
    </div>
  );
}
