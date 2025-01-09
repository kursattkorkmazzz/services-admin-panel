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
        title="Kullanıcı Yönetimi"
        description="Kullanıcılarınızı görünteleyebilir, bilgilerini düzenleyebilir ve kaldırabilirsiniz."
      />
      <Breadcrumb />
      {children}
    </Page>
  );
}
