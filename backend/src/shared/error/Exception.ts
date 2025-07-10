export class Exception extends Error {
  public static INVALID = Symbol('INVALID');
  public static UNDEFINED = Symbol('UNDEFINED');
  public static TIME_PAST = Symbol('TIME_PAST');
  public static NO_SPECIALTY = Symbol('NO_SPECIALTY');
  public static TIME_NOT_MATCH = Symbol('TIME_NOT_MATCH');
  public static NO_EXIST = Symbol('NO_EXIST');
  public static INVALID_CREDENTIALS = Symbol('INVALID_CREDENTIALS');

  public constructor(public message: string, public statusCode: number = 400, public code: Symbol) {
    super(message);
  }
}
