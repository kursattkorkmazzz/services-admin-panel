import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import PageHeader from "@/components/page/header/PageHeader";
import Page from "@/components/page/Page";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Page>
      <PageHeader
        title="Rol ve Yetki Yönetimi"
        description="Kullanıcılar için rollerini ve yetkilerini yönetebilirsiniz."
      />
      <Breadcrumb
        pathConditions={[
          { name: "Rol Yönetimi", path: "role-management" },
          { name: "Rol Yetki Düzenleme", path: "role-permission-edit" },
          { name: "Kullanıcı Rol Düzenleme", path: "user-role-edit" },
        ]}
      />
      {children}
    </Page>
  );
}
