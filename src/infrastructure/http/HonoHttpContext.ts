import { HttpContext } from '../../domain/interfaces/HttpContext';
import { Context, } from 'hono';

export class HonoHttpContext implements HttpContext {
  public constructor(private context: Context) {}

  public async getRequestBody<T = any>(): Promise<T> {
    const body = await this.context.req.json();
    return body as T;
  }
  public getRequestQuery<T = any>(): T {
    const query = this.context.req.query();
    return query as T;
  }
public send(status: number, data: any):any {
  return this.context.status(data)
}}
