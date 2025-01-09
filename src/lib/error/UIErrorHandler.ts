import ResponseType from "../ResponseType";

export default class UIErrorHandler {
  public static isPermissionError(err: ResponseType) {
    return err.error == "Permission denied.";
  }
}
