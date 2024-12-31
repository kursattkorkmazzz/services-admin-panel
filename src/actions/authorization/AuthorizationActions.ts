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
    const response: Response = await fetch(AuthService.login_uri, {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: access_token,
      },
      body: JSON.stringify({
        operation_code: operation_codes,
      }),
    });

    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}
