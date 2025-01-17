"use client";
import { UpdateAnyUserAction } from "@/actions/user/UserActions";
import Inputfield from "@/components/input/Inputfield";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ModalContext } from "@/providers/modal/ModalProvider";
import { useContext } from "react";
import { FieldValues, useForm } from "react-hook-form";

type ResetPasswordModalProps = { user_id: string };
export default function ResetPasswordModal(props: ResetPasswordModalProps) {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const alertContext = useAlertContext();
  const modalContext = useContext(ModalContext);
  const submitHandle = (data: FieldValues) => {
    UpdateAnyUserAction(
      props.user_id,
      {
        PasswordBasedAuth: {
          password: data["new-password"],
        },
      },
      localStorage.getItem("access_token") || ""
    )
      .then((response) => {
        console.log(response);
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Şifre değiştirme işlemi için yetkiniz bulunmamaktadır.",
            "error"
          );
          modalContext.hideModal();
          return;
        } else if (UIErrorHandler.isSuccess(response)) {
          alertContext.create(
            "Şifre başarıyla değiştirildi. Yeniden giriş yapmanız gerekiyor.",
            "success"
          );
          modalContext.hideModal();
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.dispatchEvent(new StorageEvent("storage"));
          return;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandle)}
      className="flex flex-col w-[30vw] gap-2 mt-5"
    >
      <Inputfield
        {...register("new-password", {
          required: "Şifre alanı boş bırakılamaz.",
        })}
        type="password"
        title="Yeni Şifre:"
        error_message={errors["new-password"]?.message as string}
      />
      <Inputfield
        {...register("new-password-again", {
          required: "Şifre alanı boş bırakılamaz.",
          validate: (value) => {
            if (value !== getValues("new-password")) {
              return "Şifreler uyuşmuyor.";
            }
          },
        })}
        type="password"
        title="Yeni Şifre Tekrar:"
        error_message={errors["new-password-again"]?.message as string}
      />

      <Inputfield
        type="submit"
        buttonTheme={"success"}
        value={"Şifreyi Değiştir"}
      />
    </form>
  );
}
