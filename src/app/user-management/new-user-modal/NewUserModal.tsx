"use client";

import { CreateNewUserAction } from "@/actions/user/UserActions";
import AvatarImage from "@/components/avatar-image/AvatarImage";
import Divider from "@/components/divider/Divider";
import Inputfield from "@/components/input/Inputfield";
import Select from "@/components/select/Select";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ModalContext } from "@/providers/modal/ModalProvider";
import { useContext, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { isAlphanumeric } from "validator";
import isEmail from "validator/lib/isEmail";
import isURL from "validator/lib/isURL";

type NewUserModalProps = { onCreated?: () => void };
export default function NewUserModal(props: NewUserModalProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const [previwımageUrl, setPreviewImageUrl] = useState<string | undefined>();
  const alertContext = useAlertContext();
  const modalContext = useContext(ModalContext);

  const validateNewUserForm = (data: FieldValues) => {
    CreateNewUserAction(data, localStorage.getItem("access_token") || "")
      .then((response) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Kullanıcı oluşturmak için gerekli yetkiniz yok.",
            "error"
          );
          modalContext.hideModal();
          return;
        } else if (UIErrorHandler.hasData(response)) {
          alertContext.create("Kullanıcı başarıyla oluşturuldu.", "success");
          props.onCreated?.();
          modalContext.hideModal();
          return;
        }
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit(validateNewUserForm)}
      className="flex flex-col min-w-[50vw] max-h-[60vh] overflow-y-scroll gap-5 mt-5"
    >
      <p className="text-sm text-gray-500"> Kişisel Bilgiler: </p>
      <div className="flex  w-full gap-3">
        <Inputfield
          {...register("firstname", { required: "İsim boş bırakılamaz." })}
          className="w-full"
          type="text"
          placeholder="İsim"
          error_message={errors["firstname"]?.message as string}
        />
        <Inputfield
          {...register("lastname", { required: "Soyisim boş bırakılamaz." })}
          type="text"
          className="w-full"
          placeholder="Soyisim"
          error_message={errors["lastname"]?.message as string}
        />
      </div>
      <Inputfield
        {...register("email", {
          required: "E-mail boş bırakılamaz.",
          validate: {
            isEmail: (value) =>
              isEmail(value) || "Geçerli bir e-mail adresi giriniz.",
          },
        })}
        type="text"
        title="E-mail:"
        error_message={errors["email"]?.message as string}
      />
      <Inputfield
        {...register("birth_date")}
        type="date"
        title="Doğum Tarihi:"
        error_message={errors["birth_date"]?.message as string}
      />

      <p className="text-sm text-gray-500"> Cinsiyet: </p>
      <Select {...register("gender", { required: "Cinsiyet seçiniz." })}>
        <option value={"male"}>Erkek</option>
        <option value={"female"}>Kadın</option>
      </Select>
      <Divider className="col-span-2" />

      <p>Hesap Bilgileri</p>

      <Inputfield
        {...register("username", {
          required: "Kullanıcı adı boş bırakılamaz.",
          minLength: {
            value: 5,
            message: "Kullanıcı adı en az 5 karakter olmalıdır.",
          },
          maxLength: {
            value: 20,
            message: "Kullanıcı adı en fazla 20 karakter olmalıdır.",
          },
          validate: {
            isAlphanumeric: (v) =>
              isAlphanumeric(v) ||
              "Kullanıcı adı sadece harf ve rakam içerebilir.",
          },
        })}
        type="text"
        title="Kullanıcı Adı"
        error_message={errors["username"]?.message as string}
      />

      <Inputfield
        {...register("password", {
          required: "Şifre boş bırakılamaz.",
        })}
        type="password"
        title="Şifre"
        error_message={errors["password"]?.message as string}
      />

      <Inputfield
        {...register("password-again", {
          required: true,
          validate: (value) =>
            value === getValues("password") || "Şifreler uyuşmuyor.",
        })}
        type="password"
        title="Şifre Tekrar"
        error_message={errors["password-again"]?.message as string}
      />
      <Inputfield
        {...register("photo_url", {
          onChange: (event) => {
            setPreviewImageUrl(event.target.value);
          },
          validate: {
            validURL: (v) => isURL(v) || "Geçerli bir URL giriniz.",
          },
        })}
        type="text"
        title="Profil Resmi:"
        error_message={errors["photo_url"]?.message as string}
      />
      <div className="flex w-full justify-center">
        <AvatarImage photo_url={previwımageUrl} />
      </div>
      <Divider />

      <Inputfield
        type="submit"
        buttonTheme={"success"}
        className="text-sm"
        value={"Değişiklikleri Kaydet"}
      />
    </form>
  );
}
