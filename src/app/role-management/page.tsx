"use client";
import { GetRolesAction } from "@/actions/role/RoleActions";
import CompoundTable from "@/components/compound-table/CompoundTable";
import FetchNavigation from "@/components/fetch-navigation/FetchNavigation";
import IconButton from "@/components/iconbutton/IconButton";
import PageHeader from "@/components/page/header/PageHeader";
import Subheader from "@/components/page/header/Subheader";
import Page from "@/components/page/Page";
import Table from "@/components/table/Table";
import TableBody from "@/components/table/TableBody";
import TableHeader from "@/components/table/TableHeader";
import ResponseType from "@/lib/ResponseType";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ClipboardList, PencilLine, Trash2, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

type Role = {
  id: string;
  name: string;
  description: string;
};

type RoleArray = Role[];

export default function RoleManagementPage() {
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
  const [roles, setRoles] = useState<RoleArray>([]);

  // Tüm rolleri çek. (Paging ve Limit işlemleri)
  const getRoles = () => {
    const access_token = localStorage.getItem("access_token") || "";

    GetRolesAction(page, limit, access_token)
      .then((response: ResponseType) => {
        if (response.data) {
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

  const nextPageButtonHandler = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };
  const beforePageButtonHandler = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  useEffect(() => {
    getRoles();
  }, [page]);

  const getOperationButtons = (role: Role) => {
    return (
      <div className="flex flex-row gap-3">
        <IconButton strokeWidth={1} Icon={ClipboardList} />
        <IconButton strokeWidth={1} Icon={PencilLine} />
        <IconButton strokeWidth={1} Icon={Trash2} />
      </div>
    );
  };

  return (
    <Page>
      <PageHeader
        title="Rol ve Yetki Yönetimi"
        description="Kullanıcılar için rollerini ve yetkilerini yönetebilirsiniz."
      />
      <Subheader>Rol Listesi</Subheader>
      <CompoundTable
        currentPage={page}
        headers={["İsim", "Açıklama", "İşlemler"]}
        rows={roles.map((role) => {
          return [role.name, role.description, getOperationButtons(role)];
        })}
        onBeforeClick={beforePageButtonHandler}
        onNextClick={nextPageButtonHandler}
        pageSize={limit}
        total={total}
      />
    </Page>
  );
}
