import { inject, injectable } from 'tsyringe';
import { LeaderContactResquestDTO } from '../../application/dto/LeaderContactRequestDTO';
import { LeaderContactResponseDTO } from '../../application/dto/LeaderContactResponseDTO';
import { ProjectBasedAdvisorFinderUseCase } from '../../application/usecase/ProjectBasedAdvisorFinderUseCase';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class ProjectBasedAdvisorFinderControllers implements HttpController {
  public constructor(
    @inject(ProjectBasedAdvisorFinderUseCase) private projectBasedAdvisorFinderHandler: ProjectBasedAdvisorFinderUseCase
  ) { }
  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name } = httpContext.getRequestQuery();
      const requestDTO: LeaderContactResquestDTO = new LeaderContactResquestDTO(name);
      const leaderContacts: LeaderContactResponseDTO[] = await this.projectBasedAdvisorFinderHandler.findAll(requestDTO);
      httpContext.send(200, leaderContacts);
    } catch (error) {
      httpContext.handlerError(error);
    }
  }
}
