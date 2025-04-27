import { container } from 'tsyringe';
import { IRegisterLeaderControllers } from '../controllers/leader/IRegisterLeaderControllers';
import { RegisterLeaderControllers } from '../controllers/leader/RegisterLeaderControllers';
import { ICreateProjectControllers } from '../controllers/project/ICreateProjectControllers';
import { CreateProjectControllers } from '../controllers/project/CreateProjectControllers';
import { IEnrollProjectControllers } from '../controllers/enroll/IEnrollProjectControllers';
import { EnrollProjectControllers } from '../controllers/enroll/EnrollProjectCotrollers';

export class Container {
  public static dependecies() {
    const registerLeader: IRegisterLeaderControllers = container.resolve(RegisterLeaderControllers);
    const createProject: ICreateProjectControllers = container.resolve(CreateProjectControllers);
    const enrollProject: IEnrollProjectControllers = container.resolve(EnrollProjectControllers);
    return {
      registerLeader,
      createProject,
      enrollProject,
    };
  }
}
