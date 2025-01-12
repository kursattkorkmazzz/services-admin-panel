import ResponseType from "../ResponseType";

export default class UIErrorHandler {
  public static isPermissionError(err: ResponseType) {
    return err.error == "Permission denied.";
  }

  public static isSuccess(response: ResponseType) {
    return response.data === "Success";
  }

  public static hasData(response: ResponseType) {
    return Object.keys(response.data).length > 0;
  }
}
