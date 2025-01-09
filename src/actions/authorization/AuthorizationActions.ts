"use server";

import AuthService from "@/services/AuthService";
import ActionsErrorHandler from "../../lib/error/ActionsErrorHandler";

type ResponseType = {
  error: any;
  data: any;
};

export async function CheckPermission(
  access_token: string,
  operation_codes: string[]
): Promise<ResponseType> {
  try {
    const body = JSON.stringify({
      operation_code:
        operation_codes.length <= 1 ? operation_codes[0] : operation_codes,
    });
    const response: Response = await fetch(AuthService.check_permission_uri, {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: "Bearer " + access_token,
      },
      body: body,
    });
    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}
