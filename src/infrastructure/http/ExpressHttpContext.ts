import { HttpContext } from '../../domain/interfaces/HttpContext';
import { Request, Response } from 'express';
import { Exception } from '../../shared/error/Exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class ExpressHttpContext implements HttpContext {
  public constructor(private request: Request, private response: Response) { }
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
  public sendError(error: unknown): any {
    if (error instanceof Exception) {
      return this.response.status(error.statusCode).json({
        message: error.message,
        statusCode: error.statusCode,
        status: false,
        code: error.code.description
      });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return this.response.status(409).json({
        message: `${error.meta?.modelName} already registered, must be unique.`,
        statusCode: 409,
        status: false,
        code: error.code
      });
    }
    return this.response.status(500).json({
      statusCode: 500,
      status: false,
      message: "Erro interno do servidor",
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
