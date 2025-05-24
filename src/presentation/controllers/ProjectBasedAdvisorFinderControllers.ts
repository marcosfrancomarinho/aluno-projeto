import { inject, injectable } from 'tsyringe';
import { LeaderContactResponseDTO } from '../../application/dto/LeaderContactResponseDTO';
import { ProjectBasedAdvisorFinderHandler } from '../../application/usecase/implementation/ProjectBasedAdvisorFinderHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/interfaces/ProjectBasedAdvisorFinderUseCase';
import { ControllerHttp } from '../../domain/interfaces/ControllerHttp';

@injectable()
export class ProjectBasedAdvisorFinderControllers implements ControllerHttp{
  public constructor(
    @inject(ProjectBasedAdvisorFinderHandler) private projectBasedAdvisorFinderHandler: ProjectBasedAdvisorFinderUseCase
  ) {}
  public async execute(http: HttpContext): Promise<void> {
    try {
      const { name } = http.getRequestQuery();
      const leaderContacts: LeaderContactResponseDTO[] = await this.projectBasedAdvisorFinderHandler.findAll({
        name,
      });
      http.send(200, leaderContacts);
    } catch (error) {
      http.send(400, error);
    }
  }
}
