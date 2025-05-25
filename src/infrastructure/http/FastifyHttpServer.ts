import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpServer, Method } from '../../domain/interfaces/HttpServer';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { FastifyHttpContext } from './FastifyHttpContext';

export class FastifyHttpServer implements HttpServer {
  private app: FastifyInstance;
  public constructor() {
    this.app = fastify();
  }

  on(method: Method, path: string, handle: (http: HttpContext) => Promise<void>): void | Promise<void> {
    this.app[method](path, async (request: FastifyRequest, reply: FastifyReply) => {
      const context: HttpContext = new FastifyHttpContext(request, reply);
      await handle(context);
    });
  }

  public listen(port: number): void {
    this.app.listen({ port }).then(() => {
      console.log('🚀 Server running on http://localhost:3000');
    });
  }
}
