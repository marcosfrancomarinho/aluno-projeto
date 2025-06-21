import { HttpContext } from '../../domain/interfaces/HttpContext';
import { Request, Response } from 'express';

export class ExpressHttpContext implements HttpContext {
  public constructor(private request: Request, private response: Response) {}
  public getRequestBody<T = any>(): T {
    const { body } = this.request;
    return body as T;
  }
  public getRequestQuery<T = any>(): T {
    const { query } = this.request;
    return query as T;
  }
  public send(status: number, data: any): void {
    this.response.status(status).json(data);
  }
  public sendError(error: any): void {
    this.response.status(400).send({
      message: error.message,
    });
  }
}
