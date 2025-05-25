import { inject, injectable } from 'tsyringe';
import { ProjectResponseDTO } from '../../application/dto/ProjectResponseDTO';
import { ProjectCreatorHandler } from '../../application/usecase/implementation/ProjectCreatorHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { ProjectCreatorUseCase } from '../../application/usecase/interfaces/ProjectCreatorUseCase';
import { HttpController } from '../../domain/interfaces/HttpController';

@injectable()
export class ProjectCreatorControllers implements HttpController {
  public constructor(@inject(ProjectCreatorHandler) private projectCreatorHandler: ProjectCreatorUseCase) {}

  public async execute(httpContext: HttpContext): Promise<void> {
    try {
      const { name, timestamp } = httpContext.getRequestBody();

      const { projectId }: ProjectResponseDTO = await this.projectCreatorHandler.create({ name, timestamp });

      httpContext.send(200, { projectId, message: 'project create successfully' });
    } catch (error) {
      httpContext.send(400, error);
    }
  }
}
