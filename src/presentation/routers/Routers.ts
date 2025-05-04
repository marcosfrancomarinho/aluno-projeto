import { Express } from 'express';
import { Container } from '../container/Container';

export class Routers {
  public static toLoading(app: Express) {
    const { leaderCreator, projectCreator, studentEnrollerInProject } = Container.dependecies();

    app.post('/register-leader', leaderCreator.execute.bind(leaderCreator));
    app.post('/create-project', projectCreator.execute.bind(projectCreator));
    app.post('/enroll-project', studentEnrollerInProject.execute.bind(studentEnrollerInProject));
  }
}
