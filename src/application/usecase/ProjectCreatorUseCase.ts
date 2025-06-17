import { inject, injectable } from 'tsyringe';
import { Project } from '../../domain/entities/Project';
import { IdGenerator } from '../../domain/interfaces/IdGenerator';
import { ProjectCreator } from '../../domain/interfaces/ProjectCreator';
import { ID } from '../../domain/valueobject/ID';
import { Specialty } from '../../domain/valueobject/Specialty';
import { Timestamp } from '../../domain/valueobject/Timestamp';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { PrismaProjectCreator } from '../../infrastructure/repository/PrismaProjectCreator';
import { ProjectRequestDTO } from '../dto/ProjectRequestDTO';
import { ProjectResponseDTO } from '../dto/ProjectResponseDTO';

@injectable()
export class ProjectCreatorUseCase {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaProjectCreator) private projectCreator: ProjectCreator
  ) { }

  public async create(projectDTO: ProjectRequestDTO): Promise<ProjectResponseDTO> {
    const code: ID = this.idGenerator.generete();
    const name: Specialty = Specialty.create(projectDTO.getName());
    const timestamp: Timestamp = Timestamp.create(projectDTO.getTimestamp());
    const project: Project = Project.create(code, name, timestamp);

    await this.projectCreator.create(project);

    const projectResponseDTO: ProjectResponseDTO = new ProjectResponseDTO(code.getValue());

    return projectResponseDTO;
  }
}
