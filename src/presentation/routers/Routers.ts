import { Container } from '../../shared/container/Container';
import { HttpServer } from '../../domain/interfaces/HttpServer';
import { HttpController } from '../../domain/interfaces/HttpController';

export class Routers {
  public constructor(private server: HttpServer) { }

  private asHandler(controller: HttpController) {
    return controller.execute.bind(controller);
  }

  public register(container: Container) {
    const {
      leaderCreatorControllers,
      projectCreatorControllers,
      studentEnrollerInProjectControllers,
      projectBasedAdvisorFinderControllers,
    } = container.dependencies();

    this.server.on('post', '/register-leader', this.asHandler(leaderCreatorControllers));

    this.server.on('post', '/create-project', this.asHandler(projectCreatorControllers));

    this.server.on('post', '/enroll-project', this.asHandler(studentEnrollerInProjectControllers));

    this.server.on('get', '/finder-leader', this.asHandler(projectBasedAdvisorFinderControllers));
  }
}
