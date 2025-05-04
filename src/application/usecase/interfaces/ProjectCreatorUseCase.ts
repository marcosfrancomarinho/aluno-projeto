import { ProjectRequestDTO } from '../../dto/ProjectRequestDTO';
import { ProjectResponseDTO } from '../../dto/ProjectResponseDTO';

export interface ProjectCreatorUseCase{
  create(input: ProjectRequestDTO): Promise<ProjectResponseDTO>;
}
