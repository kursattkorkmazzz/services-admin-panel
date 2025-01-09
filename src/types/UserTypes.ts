import { Role } from "./RoleTypes";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birth_date: Date;
  gender: string;
  photo_url: string;
  is_email_verified: boolean;
  Roles: Role[];
};
