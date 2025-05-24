export interface HttpContext {
  getRequestBody<T = any>(): T;
  getRequestQuery<T = any>(): T;
  send(status: number, data: any): void;
}
