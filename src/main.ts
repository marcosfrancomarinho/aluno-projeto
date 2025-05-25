import 'reflect-metadata';
import { Routers } from './presentation/routers/Routers';
import { ExpressHttpServer } from './infrastructure/http/ExpressHttpServer';
import { Container } from './shared/container/Container';
import { FastifyHttpServer } from './infrastructure/http/FastifyHttpServer';

function main(): void {
  const port: number = Number(process.env.PORT ?? '3000');
  const server = new FastifyHttpServer();
  const container = new Container();
  const routers = new Routers(container);
  routers.register(server);
  server.listen(port);
}
main();
