export interface HttpContext {
  getRequestBody<T = any>(): T | Promise<T>;
  getRequestQuery<T = any>(): T | Promise<T>;
  send<T = any>(status: number, data: T): any;
  sendError<T = any>(error: T): void;
}
