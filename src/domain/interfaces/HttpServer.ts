import { HttpContext } from './HttpContext';

export type Method = 'get' | 'post' | 'delete' | 'put';

export interface HttpServer {
  on(
    method: Method,
    path: string,
    handler: (httpContext: HttpContext) => Promise<void>,
    middlewares?: ((http: HttpContext) => Promise<boolean>)[]
  ): void;

  listen(port: number): void | Promise<void>;
}
