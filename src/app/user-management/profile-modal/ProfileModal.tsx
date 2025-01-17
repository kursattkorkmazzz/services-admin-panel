"use client";
import {
  DeleteAnyUserAction,
  GetAnyUserAction,
  UpdateAnyUserAction,
} from "@/actions/user/UserActions";
import AvatarImage from "@/components/avatar-image/AvatarImage";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
import IconButton from "@/components/iconbutton/IconButton";
import Inputfield from "@/components/input/Inputfield";
import Select from "@/components/select/Select";
import DateParser from "@/lib/DateParser";
import UIErrorHandler from "@/lib/error/UIErrorHandler";
import GetDirtyValues from "@/lib/GetDirtyValues";
import ResponseType from "@/lib/ResponseType";
import { useAlertContext } from "@/providers/alert/AlertProvider";
import { ModalContext } from "@/providers/modal/ModalProvider";
import { User, UserUpdate } from "@/types/UserTypes";
import { Trash2 } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import ResetPasswordModal from "./ResetPasswordModal";

type ProfileModalProps = {
  user_id: string;
  onProfileUpdated?: () => void;
};
export default function ProfileModal(props: ProfileModalProps) {
  const [userInfo, setUserInfo] = useState<User>();
  const modalContext = useContext(ModalContext);
  const alertContext = useAlertContext();

  const [editMode, setEditMode] = useState(false);

  const {
    handleSubmit,
    formState: { errors, dirtyFields, defaultValues },
    reset,
    register,
  } = useForm({
    defaultValues: userInfo,
  });

  const getUserInfo = () => {
    GetAnyUserAction(props.user_id, localStorage.getItem("access_token") || "")
      .then((response: ResponseType) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Kullanıcı bilgilerini çekebilmek için gerekli yetkiniz bulunmamaktadır.",
            "error"
          );
          modalContext.hideModal();
        }
        if (response.data) {
          setUserInfo(response.data);
          reset(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Getting user information.
  useEffect(() => {
    getUserInfo();
  }, []);

  const validateEditForm = (data: FieldValues) => {
    const newUserInfo = GetDirtyValues(dirtyFields, data);

    if (Object.keys(newUserInfo).length === 0) {
      return;
    }

    UpdateAnyUserAction(
      userInfo!.id,
      newUserInfo as UserUpdate,
      localStorage.getItem("access_token") || ""
    )
      .then((response) => {
        if (UIErrorHandler.isSuccess(response)) {
          getUserInfo();
          alertContext.create(
            "Kullanıcı bilgileri başarıyla güncellendi.",
            "success"
          );
          props.onProfileUpdated && props.onProfileUpdated();
        } else if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Kullanıcı bilgilerini güncelleyebilmek için gerekli yetkiniz bulunmamaktadır.",
            "error"
          );
        }
        modalContext.hideModal();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const discardHandler = () => {
    setEditMode(false);
    reset(userInfo);
  };

  const resetPasswordHandler = () => {
    modalContext.setModalHeader("Şifre Sıfırlama");
    modalContext.setModal(<ResetPasswordModal user_id={userInfo!.id} />);
    modalContext.showModal();
  };

  const deleteUserHandler = () => {
    DeleteAnyUserAction(
      userInfo!.id,
      localStorage.getItem("access_token") || ""
    )
      .then((response) => {
        if (UIErrorHandler.isPermissionError(response)) {
          alertContext.create(
            "Kullanıcı silmek için gerekli yetkiniz yok.",
            "error"
          );
          modalContext.hideModal();
          return;
        } else if (UIErrorHandler.isSuccess(response)) {
          alertContext.create("Kullanıcı başarıyla silindi.", "success");
          modalContext.hideModal();
          props.onProfileUpdated?.();
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex flex-col gap-5 mt-5 p-3 max-h-[70vh] overflow-y-scroll max-w-[90vw]">
      <div className="flex items-center justify-center">
        <AvatarImage
          type="circle"
          photo_url={userInfo?.photo_url}
          width={90}
          height={90}
          className="border-2 border-primary shadow-md z-0"
        />
      </div>
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2 justify-start">
          <p className="text-xs text-gray-500">
            Kayıt Tarihi: {DateParser(userInfo?.created_at)}
          </p>
          <p className="text-xs text-gray-500">
            Son Giriş Tarihi:{" "}
            {DateParser(userInfo?.PasswordBasedAuth.last_login)}
          </p>
        </div>
        <div>
          <Button
            variant={"warn"}
            size={"small"}
            onClick={() => {
              editMode ? discardHandler() : setEditMode(true);
            }}
          >
            {editMode ? "X" : "Düzenle"}
          </Button>
        </div>
      </div>
      <Divider />
      <form
        onSubmit={handleSubmit(validateEditForm)}
        className="grid grid-cols-[auto_auto] gap-5"
      >
        <p className="text-sm text-gray-500"> İsim ve Soyisim: </p>
        <div className="flex gap-3">
          <Inputfield
            {...register("firstname")}
            type="text"
            className="max-w-[150px]"
            disabled={!editMode}
          />
          <Inputfield
            {...register("lastname")}
            type="text"
            className="max-w-[150px]"
            disabled={!editMode}
          />
        </div>
        <Divider className="col-span-2" />

        <p className="text-sm text-gray-500"> Kullanıcı adı: </p>
        <div className="flex gap-3">
          <Inputfield
            {...register("PasswordBasedAuth.username")}
            type="text"
            disabled={!editMode}
          />
          {editMode && (
            <Button
              variant={"primary"}
              size={"small"}
              onClick={resetPasswordHandler}
            >
              Şifre Değiştir
            </Button>
          )}
        </div>
        <Divider className="col-span-2" />

        <p className="text-sm text-gray-500"> Profil Resmi: </p>
        <Inputfield
          {...register("photo_url")}
          type="text"
          disabled={!editMode}
        />

        <Divider className="col-span-2" />
        <p className="text-sm text-gray-500"> E-mail: </p>

        <Inputfield {...register("email")} type="text" disabled={!editMode} />

        <Divider className="col-span-2" />
        <p className="text-sm text-gray-500"> Doğum Tarihi: </p>

        <Inputfield
          {...register("birth_date")}
          type="date"
          disabled={!editMode}
        />

        <Divider className="col-span-2" />
        <p className="text-sm text-gray-500"> Cinsiyet: </p>

        <Select {...register("gender")} disabled={!editMode}>
          <option value={"male"}>Erkek</option>
          <option value={"female"}>Kadın</option>
          <option value={"unknown"} hidden>
            Belirtilmemiş
          </option>
        </Select>

        {editMode && (
          <>
            <Divider className="col-span-2" />
            <div className="flex justify-between w-full gap-5 col-span-2">
              <IconButton
                Icon={Trash2}
                strokeWidth={1.5}
                className="text-red-500"
                onClick={deleteUserHandler}
              />
              {Object.keys(dirtyFields).length > 0 && (
                <div className="flex gap-2">
                  <Button
                    variant={"destructive"}
                    size={"medium"}
                    onClick={discardHandler}
                  >
                    Vazgeç
                  </Button>
                  <Inputfield
                    type="submit"
                    buttonTheme={"success"}
                    className="text-sm"
                    value={"Değişiklikleri Kaydet"}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
}
