import { HttpContext } from './HttpContext';

export type Method = 'get' | 'post' | 'delete' | 'put';

export interface HttpServer {
  on(method: Method, path: string, handle: (http: HttpContext) => Promise<void>): void;
  listen(port: number): void;
}
