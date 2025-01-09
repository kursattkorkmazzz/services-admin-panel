import Link from "next/link";
import Inputfield from "../input/Inputfield";
import { FieldValues, useForm } from "react-hook-form";
import validator from "validator";
import { LogInIcon } from "lucide-react";
export default function LoginForm({
  formHandler,
}: {
  formHandler?: (formData: FieldValues) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formPreProcessor = (
    formData: FieldValues,
    e?: React.BaseSyntheticEvent
  ) => {
    e?.preventDefault();
    formHandler && formHandler(formData);
  };

  return (
    <div className="h-min w-[300px] bg-white rounded-md overflow-clip shadow-xl">
      <div className="flex flex-row gap-2 py-5 bg-primary justify-center items-center">
        <h2 className="text-white text-lg font-semibold select-none">
          Giriş Yap
        </h2>
      </div>
      <div className="p-5">
        <div className="w-1 h-5" />
        <form onSubmit={handleSubmit(formPreProcessor)}>
          <div className="flex flex-col gap-3">
            <Inputfield
              {...register("username", {
                required: "Lütfen kullanıcı adınızı giriniz.",
                validate: {
                  isAlphanumeric: (v) =>
                    validator.isAlphanumeric(v) ||
                    "Lütfen sadece harf ve sayı giriniz.",
                },
              })}
              type="text"
              placeholder="Username"
              error_message={errors.username?.message?.toString()}
            />
            <Inputfield
              {...register("password", {
                required: "Lütfen şifrenizi adınızı giriniz.",
              })}
              type="password"
              placeholder="Password"
              error_message={errors.password?.message?.toString()}
            />
            <Inputfield type="submit" value="Login" />
          </div>
        </form>
        <div className="flex w-full pt-2 justify-end">
          <Link
            className="text-sm text-gray-500 hover:text-gray-600"
            href={"/"}
          >
            Şifremi unuttum
          </Link>
        </div>
      </div>
    </div>
  );
}
