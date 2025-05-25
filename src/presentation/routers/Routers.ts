import { Container } from '../../shared/container/Container';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpServer } from '../../domain/interfaces/HttpServer';

export class Routers {
  public constructor(private container: Container) {}

  public register(server: HttpServer) {
    const {
      leaderCreatorControllers,
      projectCreatorControllers,
      studentEnrollerInProjectControllers,
      projectBasedAdvisorFinderControllers,
    } = this.container.dependencies();

    server.on('post', '/register-leader', async (http: HttpContext) => await leaderCreatorControllers.execute(http));

    server.on('post', '/create-project', async (http: HttpContext) => await projectCreatorControllers.execute(http));

    server.on('post', '/enroll-project', async (http: HttpContext) => await studentEnrollerInProjectControllers.execute(http));

    server.on('get', '/finder-leader', async (http: HttpContext) => await projectBasedAdvisorFinderControllers.execute(http));
  }
}
