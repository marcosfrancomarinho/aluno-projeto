import { inject, injectable } from 'tsyringe';
import { ProjectRequestDTO } from '../../dto/ProjectRequestDTO';
import { ProjectResponseDTO } from '../../dto/ProjectResponseDTO';
import { ProjectCreator } from '../../../domain/interfaces/ProjectCreator';
import { UUID } from '../../../infrastructure/idgenerator/UUID';
import { IdGenerator } from '../../../domain/interfaces/IdGenerator';
import { Specialty } from '../../../domain/valueobject/Specialty';
import { ID } from '../../../domain/valueobject/ID';
import { Project } from '../../../domain/entities/Project';
import { ProjectCreatorUseCase } from '../interfaces/ProjectCreatorUseCase';
import { PrismaProjectCreator } from '../../../infrastructure/repository/PrismaProjectCreator';

@injectable()
export class ProjectCreatorHandler implements ProjectCreatorUseCase {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaProjectCreator) private projectCreator: ProjectCreator
  ) {}
  
  public async create(input: ProjectRequestDTO): Promise<ProjectResponseDTO> {
    const code: ID = this.idGenerator.generete();
    const name: Specialty = Specialty.create(input.name);
    const project: Project = Project.create(code, name);

    await this.projectCreator.create(project);

    const codeProject: ProjectResponseDTO = { projectId: code.getValue() };

    return codeProject;
  }
}
