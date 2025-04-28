import { Express } from 'express';
import { Container } from '../container/Container';

export class Routers {
  public static toLoading(app: Express) {
    const { registerLeader, createProject, enrollProject } = Container.dependecies();

    app.post('/register-leader', registerLeader.execute.bind(registerLeader));
    app.post('/create-project', createProject.execute.bind(createProject));
    app.post('/enroll-project', enrollProject.execute.bind(enrollProject));
  }
}
