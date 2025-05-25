import { inject, injectable } from 'tsyringe';
import { LeaderContactResponseDTO } from '../../application/dto/LeaderContactResponseDTO';
import { ProjectBasedAdvisorFinderHandler } from '../../application/usecase/implementation/ProjectBasedAdvisorFinderHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/interfaces/ProjectBasedAdvisorFinderUseCase';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class ProjectBasedAdvisorFinderControllers implements HttpController {
  public constructor(
    @inject(ProjectBasedAdvisorFinderHandler) private projectBasedAdvisorFinderHandler: ProjectBasedAdvisorFinderUseCase
  ) {}
  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name } = httpContext.getRequestQuery();
      const leaderContacts: LeaderContactResponseDTO[] = await this.projectBasedAdvisorFinderHandler.findAll({
        name,
      });
      httpContext.send(200, leaderContacts);
    } catch (error) {
      httpContext.send(400, error);
    }
  }
}
