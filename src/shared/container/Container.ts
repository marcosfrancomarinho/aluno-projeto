import { container } from 'tsyringe';
import { LeaderCreatorControllers } from '../../presentation/controllers/LeaderCreatorControllers';
import { ProjectBasedAdvisorFinderControllers } from '../../presentation/controllers/ProjectBasedAdvisorFinderControllers';
import { ProjectCreatorControllers } from '../../presentation/controllers/ProjectCreatorControllers';
import { StudentEnrollerInProjectControllers } from '../../presentation/controllers/StudentEnrollerInProjectControllers';
import { EmailNotification } from '../../infrastructure/email/EmailNotification';

export class Container {
  public dependencies() {
    container.register("Observers", { useClass: EmailNotification });
    const leaderCreatorControllers = container.resolve(LeaderCreatorControllers);
    const projectCreatorControllers = container.resolve(ProjectCreatorControllers);
    const studentEnrollerInProjectControllers = container.resolve(StudentEnrollerInProjectControllers);
    const projectBasedAdvisorFinderControllers = container.resolve(ProjectBasedAdvisorFinderControllers);

    return {
      leaderCreatorControllers,
      projectCreatorControllers,
      studentEnrollerInProjectControllers,
      projectBasedAdvisorFinderControllers,
    };
  }
}
