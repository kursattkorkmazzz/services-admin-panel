"use client";
import { LoginAction } from "@/actions/authentication/AuthentiationActions";
import LoginForm from "@/components/forms/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FieldValues } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();

  const formHandler = (formdata: FieldValues) => {
    LoginAction(formdata.username, formdata.password)
      .then((result) => {
        if (result.error) {
          console.log(result.error);
          return;
        }
        const { access_token, refresh_token } = result.data;
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        window.dispatchEvent(new StorageEvent("storage"));
      })
      .catch((e) => {
        console.log(e.message);
      });
  };

  useEffect(() => {
    router.replace("/");
  }, []);

  return (
    <div className="flex items-center justify-center w-full min-h-[100vh]">
      <LoginForm formHandler={formHandler} />
    </div>
  );
}
