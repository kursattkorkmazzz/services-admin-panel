"use server";

import ActionsErrorHandler from "@/lib/error/ActionsErrorHandler";
import ResponseType from "@/lib/ResponseType";
import RoleService from "@/services/RoleService";
import { Role } from "@/types/RoleTypes";

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

export async function UpdateRoleAction(
  role: Partial<Role>,
  access_token: string
): Promise<ResponseType> {
  try {
    const body: string = JSON.stringify({
      name: role.name,
      description: role.description,
    });

    if (!role.id) {
      Promise.reject("Role id is required");
    }

    const response: Response = await fetch(
      RoleService.update_role + `/${role.id!}`,
      {
        method: "PATCH",
        headers: {
          ["Content-Type"]: "application/json",
          ["Authorization"]: `Bearer ${access_token}`,
        },
        body: body,
      }
    );

    const result = await response.json();

    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function DeleteRoleAction(
  role_id: string,
  access_token: string
): Promise<ResponseType> {
  try {
    if (!role_id) {
      Promise.reject("Role id is required");
    }

    const response: Response = await fetch(
      RoleService.delete_role + `/${role_id}`,
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

export type RoleCreateType = Partial<Pick<Role, "description">> &
  Pick<Role, "name">;
export async function CreateRoleAction(
  role: RoleCreateType,
  access_token: string
): Promise<ResponseType> {
  try {
    const body: string = JSON.stringify({
      name: role.name,
      description: role.description,
    });

    const response: Response = await fetch(RoleService.add_role, {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${access_token}`,
      },
      body,
    });

    return await response.json();
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}
