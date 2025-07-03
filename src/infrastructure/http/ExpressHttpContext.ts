import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { Exception } from '../../shared/error/Exception';

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
  public send(status: number, data: any, token?: string): any {
    token ? this.response.status(status).setHeader('token', token).json(data) : this.response.status(status).json(data);
  }
  public sendError(error: unknown): any {
    if (error instanceof Exception) {
      return this.response.status(error.statusCode).send({
        status: false,
        statusCode: error.statusCode,
        message: error.message,
        code: error.code.description,
      });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return this.response.status(409).send({
        status: false,
        statusCode: 409,
        message: `${error.meta?.modelName?.toString() ?? 'Field'} already registered, must be unique.`,
        code: error.code,
      });
    }
    console.error('Unhandled internal error:', error);
    return this.response.status(500).send({
      status: false,
      statusCode: 500,
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
  public getToken<T = any>(key: string): T {
    const token = this.request.headers[key] ?? '';
    return token as T;
  }
}
