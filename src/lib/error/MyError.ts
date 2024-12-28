import MyErrorCodes from "./MyErrorCodes";

export default class MyError extends Error {
  error_code: string;
  message: string;

  constructor(error: MyErrorCodes) {
    super();
    this.message = error.toString();
    this.error_code = MyError.getKeyByValue(error);
  }

  public static create(error: MyErrorCodes): MyError {
    return new MyError(error);
  }

  public static getKeyByValue(value: MyErrorCodes): string {
    const findKey = Object.keys(MyErrorCodes).find((key) => {
      if (MyErrorCodes[key as keyof typeof MyErrorCodes] === value) {
        return key;
      }
    })!;
    return findKey;
  }
}
