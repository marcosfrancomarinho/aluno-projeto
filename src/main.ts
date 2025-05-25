import 'reflect-metadata';
import { Routers } from './presentation/routers/Routers';
import { ExpressHttpServer } from './infrastructure/http/ExpressHttpServer';
import { Container } from './shared/container/Container';
import { FastifyHttpServer } from './infrastructure/http/FastifyHttpServer';
import { HttpServer } from './domain/interfaces/HttpServer';

function main(): void {
  const port: number = Number(process.env.PORT ?? '3000');
  const container: Container = new Container();
  const routers: Routers = new Routers(container);
  const server: HttpServer =  new FastifyHttpServer() ?? new ExpressHttpServer;
  routers.register(server);
  server.listen(port);
}


main();
