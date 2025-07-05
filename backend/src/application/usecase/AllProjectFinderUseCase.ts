import { Project } from '../../domain/entities/Project';
import { AllProjectFinder } from '../../domain/interfaces/AllProjectFinder';
import { AllProjectResponseDTO } from '../dto/AllProjectResponseDTO';

export class AllProjectFinderUseCase {
  public constructor(private allProjectFinderAll: AllProjectFinder) {}

  public async findAll(): Promise<AllProjectResponseDTO[]> {
    const foundAllProject: Project[] = await this.allProjectFinderAll.findAll();
    const allProjects: AllProjectResponseDTO[] = foundAllProject.map(
      (project) => new AllProjectResponseDTO(project.getCode(), project.getRawName(), project.getTimestamp())
    );
    return allProjects;
  }
}
