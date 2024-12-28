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

export async function LogoutAction(access_token: string): Promise<number> {
  try {
    const response: Response = await fetch(AuthService.logout_uri, {
      method: "POST",
      headers: {
        ["Authorization"]: "Bearer " + access_token,
      },
    });
    const statusCode = response.status;
    return Promise.resolve(statusCode);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function RefreshTokenAction(
  refresh_token: string
): Promise<ResponseType> {
  try {
    const response: Response = await fetch(AuthService.refresh_uri, {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
      },
      body: JSON.stringify({
        refresh_token,
      }),
    });

    const result = await response.json();
    return Promise.resolve(result);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}

export async function CheckSessionAction(
  access_token: string
): Promise<number> {
  try {
    const response: Response = await fetch(AuthService.check_session_uri, {
      method: "POST",
      headers: {
        ["Content-Type"]: "application/json",
        ["Authorization"]: "Bearer " + access_token,
      },
    });
    const statusCode = response.status;
    return Promise.resolve(statusCode);
  } catch (e: any) {
    throw ActionsErrorHandler(e);
  }
}
