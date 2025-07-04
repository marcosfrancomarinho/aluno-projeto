import { Token } from '../entities/Token';

export interface HttpContext {
  getRequestBody<T = any>(): T | Promise<T>;
  getRequestQuery<T = any>(): T | Promise<T>;
  send<T = any>(status: number, data: T, token?: string): any;
  sendError<T = any>(error: T): any;
  getToken(key: string): Token;
}
