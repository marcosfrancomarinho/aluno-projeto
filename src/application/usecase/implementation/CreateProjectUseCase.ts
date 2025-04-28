import { inject, injectable } from 'tsyringe';
import { InputProjectDTO } from '../../dto/InputProjectDTO';
import { OutputProjectDTO } from '../../dto/OutputProjectDTO';
import { PrismaCreateProject } from '../../../infrastructure/repository/PrismaCreateProject';
import { CreateProject } from '../../../domain/interfaces/CreateProject';
import { UUID } from '../../../infrastructure/idgenerator/UUID';
import { IdGenerator } from '../../../domain/interfaces/IdGenerator';
import { Specialty } from '../../../domain/valueobject/Specialty';
import { ID } from '../../../domain/valueobject/ID';
import { Project } from '../../../domain/entities/Project';
import { ICreateProjectUseCase } from '../interfaces/ICreateProjectUseCase';

@injectable()
export class CreateProjectUseCase implements ICreateProjectUseCase {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaCreateProject) private createProject: CreateProject
  ) {}
  public async create(input: InputProjectDTO): Promise<OutputProjectDTO> {
    const code: ID = ID.create(this.idGenerator.create());
    const name: Specialty = Specialty.create(input.name);
    const project: Project = Project.create(code, name);
    const id: ID = await this.createProject.create(project);
    const idProject: OutputProjectDTO = { idProject: id.getValue() };
    return idProject;
  }
}
