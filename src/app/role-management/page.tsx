"use client";
import { GetRolesAction } from "@/actions/role/RoleActions";
import CompoundTable from "@/components/compound-table/CompoundTable";
import FetchNavigation from "@/components/fetch-navigation/FetchNavigation";
import IconButton from "@/components/iconbutton/IconButton";
import PageHeader from "@/components/page/header/PageHeader";
import Subheader from "@/components/page/header/Subheader";
import Page from "@/components/page/Page";
import ViewRolesPage from "@/components/role-management/ViewRolesPage";
import Table from "@/components/table/Table";
import TableBody from "@/components/table/TableBody";
import TableHeader from "@/components/table/TableHeader";
import ResponseType from "@/lib/ResponseType";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ClipboardList, PencilLine, Trash2, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";

export default function RoleManagementPage() {
  return (
    <Page>
      <PageHeader
        title="Rol ve Yetki Yönetimi"
        description="Kullanıcılar için rollerini ve yetkilerini yönetebilirsiniz."
      />
      <ViewRolesPage />
    </Page>
  );
}
