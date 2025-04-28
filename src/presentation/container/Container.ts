import { container } from 'tsyringe';
import { IRegisterLeaderControllers } from '../controllers/interfaces/IRegisterLeaderControllers';
import { RegisterLeaderControllers } from '../controllers/implementation/RegisterLeaderControllers';
import { ICreateProjectControllers } from '../controllers/interfaces/ICreateProjectControllers';
import { CreateProjectControllers } from '../controllers/implementation/CreateProjectControllers';
import { IEnrollProjectControllers } from '../controllers/interfaces/IEnrollProjectControllers';
import { EnrollProjectControllers } from '../controllers/implementation/EnrollProjectCotrollers';

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
