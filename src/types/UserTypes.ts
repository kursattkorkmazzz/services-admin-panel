import { PasswordBasedAuth } from "./PasswordBasedAuth";
import { Role } from "./RoleTypes";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birth_date: string;
  gender: string;
  photo_url: string;
  is_email_verified: boolean;
  Roles: Role[];
  PasswordBasedAuth: PasswordBasedAuth;
  created_at: string;
};

export type UserUpdate = Partial<
  Omit<
    Omit<User, "PasswordBasedAuth"> & {
      PasswordBasedAuth: Partial<PasswordBasedAuth>;
    },
    "Roles"
  >
>;

export type UserCreate = Partial<
  Omit<
    Omit<User, "PasswordBasedAuth"> & {
      username: string;
      password: string;
    },
    "Roles"
  >
>;
