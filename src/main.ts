import 'reflect-metadata';
import { Routers } from './presentation/routers/Routers';
import { ExpressHttpServer } from './infrastructure/http/ExpressHttpServer';
import { Container } from './shared/container/Container';
import { FastifyHttpServer } from './infrastructure/http/FastifyHttpServer';
import { HonoHttpServer } from './infrastructure/http/HonoHttpServer';

function main(): void {
  const port: number = Number(process.env.PORT ?? '3000');
  const server = new ExpressHttpServer();
  const container = new Container();
  const routers = new Routers(container);
  routers.start(server);
  server.listen(port);
}
main();
