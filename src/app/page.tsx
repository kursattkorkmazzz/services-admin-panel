"use client";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { BookUserIcon } from "lucide-react";

export default function Home() {
  const alertContext = useAlertContext();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <BookUserIcon width={50} height={50} strokeWidth="1" />
      <h1 className="text-xl">Hoşgeldiniz</h1>
      <p className="text-xs text-gray-500">
        Bir problem çıkması durumunda lütfen bizimle iletişime geçiniz.
      </p>
    </div>
  );
}
