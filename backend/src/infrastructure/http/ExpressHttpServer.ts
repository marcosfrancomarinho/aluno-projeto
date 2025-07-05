import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpControllers } from '../../domain/interfaces/HttpController';
import { HttpServer, Method } from '../../domain/interfaces/HttpServer';
import { ExpressHttpContext } from './ExpressHttpContext';

export class ExpressHttpServer implements HttpServer {
  private app: Express;

  public constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(
      cors({
        exposedHeaders: ['token'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: ['*'],
        methods: ['GET', 'POST'],
      })
    );
  }

  public on(method: Method, path: string, controller: HttpControllers, middlewares: HttpControllers[] = []): any {
    this.app[method](path, async (request: Request, response: Response) => {
      const context: HttpContext = new ExpressHttpContext(request, response);
      for (const middleware of middlewares) {
        await middleware.execute(context);
        if (response.headersSent) return;
      }
      await controller.execute(context);
    });
  }
  public listen(port: number): void {
    this.app.listen(port, '0.0.0.0', () => {
      console.log(`server online on http://localhost:${port}`);
    });
  }
}
