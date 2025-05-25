import { Container } from '../../shared/container/Container';
import { HttpServer } from '../../domain/interfaces/HttpServer';
import { HttpController } from '../../domain/interfaces/HttpController';

export class Routers {
  public constructor(private container: Container) {}

  private asHandler(controller: HttpController) {
    return controller.execute.bind(controller);
  }

  public register(server: HttpServer) {
    const {
      leaderCreatorControllers,
      projectCreatorControllers,
      studentEnrollerInProjectControllers,
      projectBasedAdvisorFinderControllers,
    } = this.container.dependencies();

    server.on('post', '/register-leader', this.asHandler(leaderCreatorControllers));

    server.on('post', '/create-project', this.asHandler(projectCreatorControllers));

    server.on('post', '/enroll-project', this.asHandler(studentEnrollerInProjectControllers));

    server.on('get', '/finder-leader', this.asHandler(projectBasedAdvisorFinderControllers));
  }
}
