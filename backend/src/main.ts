import { Routers } from './presentation/routers/Routers';
import { ExpressHttpServer } from './infrastructure/http/ExpressHttpServer';
import { Container } from './shared/container/Container';
import { HttpServer } from './domain/interfaces/HttpServer';

function main(): void {
  const port: number = Number(process.env.PORT ?? '3000');
  const container: Container = Container.getInstance();
  const server: HttpServer = new ExpressHttpServer();
  const routers: Routers = new Routers(server);
  routers.register(container);
  server.listen(port);
}
main();
