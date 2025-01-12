"use server";

import ActionsErrorHandler from "@/lib/error/ActionsErrorHandler";
import ResponseType from "@/lib/ResponseType";
import UserService from "@/services/UserService";
import { UserCreate, UserUpdate } from "@/types/UserTypes";

export async function GetAllUsersAction(
  access_token: string,
  page?: number,
  limit?: number
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      UserService.get_all_users + `?page=${page || 0}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
      }
    );

    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function GetAnyUserAction(
  user_id: string,
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      UserService.get_any_user + "/" + user_id,
      {
        method: "GET",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
      }
    );

    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function UpdateAnyUserAction(
  user_id: string,
  new_user: UserUpdate,
  access_token: string
): Promise<ResponseType> {
  try {
    const body = JSON.stringify({
      firstname: new_user.firstname,
      lastname: new_user.lastname,
      email: new_user.email,
      birth_date: new_user.birth_date,
      gender: new_user.gender,
      photo_url: new_user.photo_url,
      username: new_user.PasswordBasedAuth?.username,
      password: new_user.PasswordBasedAuth?.password,
    });

    const responseForUser: Response = await fetch(
      UserService.update_any_user + "/" + user_id,
      {
        method: "PATCH",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
        body,
      }
    );

    const responseForPasswordBasedAuth: Response = await fetch(
      UserService.update_any_user + "/" + user_id + "/password-based-auth",
      {
        method: "PATCH",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
        body,
      }
    );
    const result = await responseForPasswordBasedAuth.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function CreateNewUserAction(
  new_user: UserCreate,
  access_token: string
): Promise<ResponseType> {
  try {
    const body = JSON.stringify({
      firstname: new_user.firstname,
      lastname: new_user.lastname,
      email: new_user.email,
      birth_date: new_user.birth_date || undefined,
      gender: new_user.gender,
      photo_url: new_user.photo_url,
      username: new_user.username,
      password: new_user.password,
    });

    const responseForUser: Response = await fetch(
      UserService.create_user + "/",
      {
        method: "POST",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
        body,
      }
    );

    const result = await responseForUser.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function DeleteAnyUserAction(
  user_id: string,
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      UserService.create_user + "/" + user_id,
      {
        method: "DELETE",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
      }
    );

    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}
