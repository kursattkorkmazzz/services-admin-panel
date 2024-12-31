import { Role } from "@/types/RoleTypes";
import { useEffect, useState } from "react";
import RoleCrudForm from "../forms/RoleCrudForm";
import { FieldValues } from "react-hook-form";
import Inputfield from "../input/Inputfield";

export type RoleEditPageProps = {
  role?: Role;
  editMode?: boolean;
  onSubmitHandler?: (data: FieldValues) => void;
};

export default function RoleEditPage(props: RoleEditPageProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(
    props.editMode || false
  );

  const defaultValues =
    props.editMode && props.role
      ? {
          role_name: props.role.name,
          role_description: props.role.description,
        }
      : undefined;

  return (
    <RoleCrudForm
      defaultValues={defaultValues}
      onSubmitHandler={(data: FieldValues) => {
        props.onSubmitHandler && props.onSubmitHandler(data);
      }}
    >
      <Inputfield
        type="submit"
        buttonTheme={isEditMode ? "success" : "primary"}
        value={isEditMode ? "Kaydet" : "Ekle"}
      />
    </RoleCrudForm>
  );
}
