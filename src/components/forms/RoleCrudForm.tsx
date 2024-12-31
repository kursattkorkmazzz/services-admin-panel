import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import Inputfield from "../input/Inputfield";
import React, { useEffect } from "react";
import Textarea from "../input/Textarea";

export type RoleCrudFormProps = {
  onSubmitHandler?: SubmitHandler<FieldValues>;
  defaultValues?: FieldValues;
  errors?: FieldErrors<FieldValues>;
  children?: React.ReactNode;
};

export default function RoleCrudForm(props: RoleCrudFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    reset();
  }, []);

  return (
    <form
      onSubmit={handleSubmit((data: FieldValues) => {
        props.onSubmitHandler && props.onSubmitHandler(data);
      })}
      className="w-full h-auto"
    >
      <div className="flex flex-col w-full gap-3 py-5">
        <Inputfield
          {...register("role_name", {
            required: "Rol adı boş bırakılamaz.",
          })}
          type="text"
          placeholder="Rol adı"
          defaultValue={props.defaultValues?.role_name || ""}
          error_message={
            props.errors?.role_name?.message?.toString() ||
            errors.role_name?.message?.toString()
          }
          title="Rol Adı"
        />
        <Textarea
          {...register("role_description")}
          placeholder="Rol açıklaması"
          defaultValue={props.defaultValues?.role_description || ""}
          className="min-w-[400px] min-h-[200px]"
          title="Rol Açıklaması"
        ></Textarea>
      </div>

      {props.children}
    </form>
  );
}
