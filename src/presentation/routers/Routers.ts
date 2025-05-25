import { Container } from '../../shared/container/Container';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpServer } from '../../domain/interfaces/HttpServer';

export class Routers {
  public constructor(private container: Container) {}

  public start(server: HttpServer) {
    const { leaderCreator, projectCreator, studentEnrollerInProject, projectBasedAdvisorFinder } = this.container.dependencies();

    server.on('post', '/register-leader', async (http: HttpContext) => {
      return await leaderCreator.execute(http);
    });

    server.on('post', '/create-project', async (http: HttpContext) => {
      return await projectCreator.execute(http);
    });

    server.on('post', '/enroll-project', async (http: HttpContext) => {
      return await studentEnrollerInProject.execute(http);
    });

    server.on('get', '/finder-leader', async (http: HttpContext) => {
      return await projectBasedAdvisorFinder.execute(http);
    });
  }
}
