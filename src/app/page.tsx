"use client";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { BookUserIcon } from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const alertContext = useAlertContext();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <BookUserIcon width={50} height={50} strokeWidth="1" />
      <h1 className="text-xl">Hoşgeldiniz</h1>
      <p className="text-xs text-gray-500">
        Bir problem çıkması durumunda lütfen bizimle iletişime geçiniz.
      </p>
      <button
        onClick={() => {
          alertContext.create("This is test message.", "info", 3);
        }}
      >
        Info Alert Test
      </button>
      <button
        onClick={() => {
          alertContext.create("This is test warning message.", "warning", 3);
        }}
      >
        Warning Alert Test
      </button>
      <button
        onClick={() => {
          alertContext.create("This is test error message.", "error", 3);
        }}
      >
        Error Alert Test
      </button>
    </div>
  );
}
