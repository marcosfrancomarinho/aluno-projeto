import { HttpServer } from '../../domain/interfaces/HttpServer';
import { Container } from '../../shared/container/Container';

export class Routers {
  public constructor(private server: HttpServer) {}

  public register(container: Container) {
    const {
      leaderCreatorControllers,
      projectCreatorControllers,
      studentEnrollerInProjectControllers,
      projectBasedAdvisorFinderControllers,
      allProjectFinderControllers,
      signUpUserControllers,
      loginUserControllers,
      userAuthenticatorMiddlewares,
    } = container.dependencies();

    this.server.on('post', '/register-leader', leaderCreatorControllers);

    this.server.on('post', '/create-project', projectCreatorControllers);

    this.server.on('post', '/enroll-project', studentEnrollerInProjectControllers);

    this.server.on('get', '/finder-leader', projectBasedAdvisorFinderControllers, [userAuthenticatorMiddlewares]);

    this.server.on('get', '/finder-all-projects', allProjectFinderControllers);

    this.server.on('post', '/sign-up-user', signUpUserControllers);

    this.server.on('post', '/login-user', loginUserControllers);
  }
}
