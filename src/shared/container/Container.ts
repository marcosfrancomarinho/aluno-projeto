import { container } from 'tsyringe';
import { LeaderCreatorControllers } from '../../presentation/controllers/LeaderCreatorControllers';
import { ProjectCreatorControllers } from '../../presentation/controllers/ProjectCreatorControllers';
import { StudentEnrollerInProjectControllers } from '../../presentation/controllers/StudentEnrollerInProjectControllers';

export class Container {
  public static dependecies() {
    const leaderCreator = container.resolve(LeaderCreatorControllers);
    const projectCreator = container.resolve(ProjectCreatorControllers);
    const studentEnrollerInProject = container.resolve(StudentEnrollerInProjectControllers);
    return {
      leaderCreator,
      projectCreator,
      studentEnrollerInProject,
    };
  }
}
