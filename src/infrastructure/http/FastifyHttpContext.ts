import { HttpContext } from '../../domain/interfaces/HttpContext';
import { FastifyReply, FastifyRequest } from 'fastify';

export class FastifyHttpContext implements HttpContext {
  public constructor(private request: FastifyRequest, private reply: FastifyReply) {}
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
  public sendError(error: any): void {
    this.reply.code(400).send({
      message: error.message,
    });
  }
}
