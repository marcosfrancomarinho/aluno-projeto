import { container } from 'tsyringe';
import { LeaderCreatorControllers } from '../controllers/LeaderCreatorControllers';
import { ProjectCreatorControllers } from '../controllers/ProjectCreatorControllers';
import { StudentEnrollerInProjectControllers } from '../controllers/StudentEnrollerInProjectControllers';

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
