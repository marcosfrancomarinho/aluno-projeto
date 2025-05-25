import { container } from 'tsyringe';
import { LeaderCreatorControllers } from '../../presentation/controllers/LeaderCreatorControllers';
import { ProjectBasedAdvisorFinderControllers } from '../../presentation/controllers/ProjectBasedAdvisorFinderControllers';
import { ProjectCreatorControllers } from '../../presentation/controllers/ProjectCreatorControllers';
import { StudentEnrollerInProjectControllers } from '../../presentation/controllers/StudentEnrollerInProjectControllers';

export class Container {
  public  dependencies() {
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
