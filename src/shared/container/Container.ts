import { container } from 'tsyringe';
import { LeaderCreatorControllers } from '../../presentation/controllers/LeaderCreatorControllers';
import { ProjectCreatorControllers } from '../../presentation/controllers/ProjectCreatorControllers';
import { StudentEnrollerInProjectControllers } from '../../presentation/controllers/StudentEnrollerInProjectControllers';
import { ProjectBasedAdvisorFinderControllers } from '../../presentation/controllers/ProjectBasedAdvisorFinderControllers';

export class Container {
  public static dependecies() {
    const leaderCreator = container.resolve(LeaderCreatorControllers);
    const projectCreator = container.resolve(ProjectCreatorControllers);
    const studentEnrollerInProject = container.resolve(StudentEnrollerInProjectControllers);
    const projectBasedAdvisorFinder = container.resolve(ProjectBasedAdvisorFinderControllers);
    
    return {
      leaderCreator,
      projectCreator,
      studentEnrollerInProject,
      projectBasedAdvisorFinder,
    };
  }
}
