import { HttpContext } from '../../domain/interfaces/HttpContext';
import { FastifyReply, FastifyRequest } from 'fastify';
import { Exception } from '../../shared/error/Exception';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export class FastifyHttpContext implements HttpContext {
  public constructor(private request: FastifyRequest, private reply: FastifyReply) { }
  public getRequestBody<T = any>(): T {
    const { body } = this.request;
    return body as T;
  }
  public getRequestQuery<T = any>(): T {
    const { query } = this.request;
    return query as T;
  }
  public send(status: number, data: any): void {
    this.reply.code(status).send(data);
  }
  public sendError(error: unknown): any {
    if (error instanceof Exception) {
      return this.reply.status(error.statusCode).send({
        message: error.message,
        statusCode: error.statusCode,
        status: false,
        code: error.code.description
      });
    }
    if (error instanceof PrismaClientKnownRequestError) {
      return this.reply.status(409).send({
        message: `${error.meta?.modelName} already registered, must be unique.`,
        statusCode: 409,
        status: false,
        code: error.code
      });
    }
    return this.reply.status(500).send({
      message: "Erro interno do servidor",
      statusCode: 500,
      status: false,
      code: "INTERNAL_SERVER_ERROR"
    });
  }
}
