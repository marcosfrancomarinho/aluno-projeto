import { Express } from 'express';
import { Container } from '../container/Container';

export class Routers {
  public static toLoading(app: Express) {
    const { registerLeader, createProject, enrollProject } = Container.dependecies();

    app.post('/register-leader', registerLeader.toRegister.bind(registerLeader));
    app.post('/create-project', createProject.toCreate.bind(createProject));
    app.post('/enroll-project', enrollProject.toEnroll.bind(enrollProject));
  }
}
