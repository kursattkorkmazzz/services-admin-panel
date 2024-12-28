import MyError from "./MyError";
import MyErrorCodes from "./MyErrorCodes";

export default function ActionsErrorHandler(err: any): MyError {
  if (err.cause?.code == "ECONNREFUSED") {
    return MyError.create(MyErrorCodes.SERVICE_NOT_RESPONDING);
  }
  if (!(err instanceof MyError)) {
    console.log(err);
  }
  return MyError.create(MyErrorCodes.UNKNOWN_ERROR);
}
