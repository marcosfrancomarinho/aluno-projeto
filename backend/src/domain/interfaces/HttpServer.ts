import { HttpControllers } from './HttpController';

export type Method = 'get' | 'post' | 'delete' | 'put';

export interface HttpServer {
  on(method: Method, path: string, controller: HttpControllers, middlewares?: HttpControllers[]): any;

  listen(port: number): void | Promise<void>;
}
