import AlertProvider from "@/providers/alert/AlertProvider";
import "./globals.css";
import SidebarPanel from "@/components/sidebar/SidebarPanel";
import AuthProvider from "@/providers/auth/AuthProvider";
import ModalProvider from "@/providers/modal/ModalProvider";
import { Metadata } from "next";

export const MyMetadata: Metadata = {
  title: "Admin Panel",
  description: "This is a admin panel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="relative">
        <AlertProvider>
          <AuthProvider>
            <ModalProvider>
              <div className="flex flex-row h-screen w-screen">
                <div className="w-1/5 min-w-[200px] h-screen">
                  <SidebarPanel />
                </div>
                <div className="w-4/5 py-3 px-5 overflow-x-hidden overflow-y-scroll ">
                  {children}
                </div>
              </div>
            </ModalProvider>
          </AuthProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
