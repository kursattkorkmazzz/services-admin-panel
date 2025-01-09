import ActionsErrorHandler from "@/lib/error/ActionsErrorHandler";
import ResponseType from "@/lib/ResponseType";
import RoleService from "@/services/RoleService";

export async function GetPermissionsOfRoleAction(
  role_id: string,
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      RoleService.get_permissions + `/${role_id}/permissions`,
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

export async function GetAllPermissions(
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(RoleService.get_all_permissions, {
      method: "GET",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: `Bearer ${access_token}`,
      },
    });
    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function RemovePermissionFromRole(
  role_id: string,
  permission_id: string,
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      RoleService.remove_permission + `/${role_id}/permission/${permission_id}`,
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

export async function AddPermissionToRole(
  role_id: string,
  permission_id: string,
  access_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(
      RoleService.remove_permission + `/${role_id}/permission/${permission_id}`,
      {
        method: "POST",
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
