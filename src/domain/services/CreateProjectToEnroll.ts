import { inject, injectable } from 'tsyringe';
import { InputEnrollDTO } from '../../application/dto/InputEnrollDTO';
import { PrimaSearchProjectExistence } from '../../infrastructure/repository/PrismaSearchProjectExistence';
import { Project } from '../entities/Project';
import { SearchProjectExistence } from '../interfaces/SearchProjectExistence';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';

type ProjectType = InputEnrollDTO['project'];

@injectable()
export class CreateProjectToEnroll {
  public constructor(@inject(PrimaSearchProjectExistence) private searchProjectExistence: SearchProjectExistence) {}

  public async create({ name }: ProjectType): Promise<Project> {
    const nameProject: Specialty = Specialty.create(name);
    const codeProject: ID | null = await this.searchProjectExistence.search(nameProject);

    if (!codeProject) throw new Error('non-existent project in the institution');

    const project: Project = Project.create(codeProject, nameProject);
    return project;
  }
}
