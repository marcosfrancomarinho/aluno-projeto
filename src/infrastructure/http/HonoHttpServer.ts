import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpServer, Method } from '../../domain/interfaces/HttpServer';
import { Context, Hono } from 'hono';
import { serve } from '@hono/node-server';
import { HonoHttpContext } from './HonoHttpContext';

export class HonoHttpServer implements HttpServer {
  private hono: Hono;
  public constructor() {
    this.hono = new Hono();
  }

  public on(method: Method, path: string, handle: (http: HttpContext) => Promise<void> | void): void | Promise<void> {
    this.hono[method](path, async (context: Context) => {
      const contextHttp: HttpContext = new HonoHttpContext(context);
      return await handle(contextHttp);
    });
  }
  public listen(port: number): void | Promise<void> {
    serve({
      fetch: this.hono.fetch,
      port,
    });
    console.log(`🚀 Servidor rodando em http://localhost:${port}`);
  }
}
