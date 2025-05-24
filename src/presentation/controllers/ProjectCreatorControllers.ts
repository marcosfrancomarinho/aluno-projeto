import { inject, injectable } from 'tsyringe';
import { ProjectResponseDTO } from '../../application/dto/ProjectResponseDTO';
import { ProjectCreatorHandler } from '../../application/usecase/implementation/ProjectCreatorHandler';
import { HttpContext } from '../../domain/interfaces/HttpContext';
import { ProjectCreatorUseCase } from '../../application/usecase/interfaces/ProjectCreatorUseCase';
import { ControllerHttp } from '../../domain/interfaces/ControllerHttp';

@injectable()
export class ProjectCreatorControllers implements ControllerHttp{
  public constructor(@inject(ProjectCreatorHandler) private projectCreatorHandler: ProjectCreatorUseCase) {}

  public async execute(http: HttpContext): Promise<void> {
    try {
      const { name, timestamp } = http.getRequestBody();

      const { projectId }: ProjectResponseDTO = await this.projectCreatorHandler.create({ name, timestamp });

      http.send(200, { projectId, message: 'project create successfully' });
    } catch (error) {
      http.send(400, error);
    }
  }
}
