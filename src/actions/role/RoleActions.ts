"use server";

import ActionsErrorHandler from "@/lib/error/ActionsErrorHandler";
import ResponseType from "@/lib/ResponseType";
import RoleService from "@/services/RoleService";

export async function GetRolesAction(
  page: number,
  limit: number,
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      RoleService.get_role_s_service + `?page=${page || 0}&limit=${limit || 5}`,
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
