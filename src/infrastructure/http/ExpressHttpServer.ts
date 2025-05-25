import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpServer, Method } from '../../domain/interfaces/HttpServer';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { ExpressHttpContext } from './ExpressHttpContext';

export class ExpressHttpServer implements HttpServer {
  private app: Express;

  public constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public on(method: Method, path: string, handle: (http: HttpContext) => Promise<void>): void {
    this.app[method](path, async (request: Request, response: Response) => {
      const context: HttpContext = new ExpressHttpContext(request, response);
      await handle(context);
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`server online on http://localhost:${port}`);
    });
  }
}
