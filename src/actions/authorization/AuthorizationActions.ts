"use server";

import AuthService from "@/services/AuthService";
import ActionsErrorHandler from "../../lib/error/ActionsErrorHandler";

type ResponseType = {
  error: any;
  data: any;
};

export async function LoginAction(
  username: string,
  password: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(AuthService.login_uri, {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["Auth-Type"]: "password",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}
