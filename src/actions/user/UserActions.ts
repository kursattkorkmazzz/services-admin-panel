"use server";

import ActionsErrorHandler from "@/lib/error/ActionsErrorHandler";
import ResponseType from "@/lib/ResponseType";
import UserService from "@/services/UserService";

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
