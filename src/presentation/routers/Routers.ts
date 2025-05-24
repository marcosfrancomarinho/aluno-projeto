import { Express } from 'express';
import { Container } from '../../shared/container/Container';
import { ExpressHttpContext } from '../../infrastructure/http/ExpressHttpContext';
import { HttpContext } from '../../domain/interfaces/HttpContext';

export class Routers {
  public static start(app: Express) {
    const { leaderCreator, projectCreator, studentEnrollerInProject, projectBasedAdvisorFinder } = Container.dependecies();

    app.post('/register-leader', async (request, response) => {
      const http: HttpContext = new ExpressHttpContext(request, response);
      await leaderCreator.execute(http);
    });
    app.post('/create-project', async (request, response) => {
      const http: HttpContext = new ExpressHttpContext(request, response);
      await projectCreator.execute(http);
    });
    app.post('/enroll-project', async (request, response) => {
      const http: HttpContext = new ExpressHttpContext(request, response);
      await studentEnrollerInProject.execute(http);
    });
    app.get('/finder-leader', async (request, response) => {
      const http: HttpContext = new ExpressHttpContext(request, response);
      await projectBasedAdvisorFinder.execute(http);
    });
  }
}
