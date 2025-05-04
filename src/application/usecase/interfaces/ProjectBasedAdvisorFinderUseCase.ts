import { LeaderContactResponseDTO } from '../../dto/LeaderContactResponseDTO';
import { ProjectRequestDTO } from '../../dto/ProjectRequestDTO';

export interface ProjectBasedAdvisorFinderUseCase {
  findAll(input: ProjectRequestDTO): Promise<LeaderContactResponseDTO[]>;
}
