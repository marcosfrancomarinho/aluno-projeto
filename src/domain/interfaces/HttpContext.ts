export interface HttpContext {
  getRequestBody<T = any>(): T | Promise<T>;
  getRequestQuery<T = any>(): T | Promise<T>;
  send(status: number, data: any): any;
  handlerError(error: any): void;
}
