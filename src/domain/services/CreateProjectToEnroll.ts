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
  public constructor(@inject(PrimaSearchProjectExistence) private projectExistence: SearchProjectExistence) {}

  public async execute(input: ProjectType): Promise<Project> {
    const name: Specialty = Specialty.create(input.name);
    const code: ID | null = await this.projectExistence.search(name);

    if (!code) throw new Error('non-existent project in the institution');

    const project: Project = Project.create(code, name);
    return project;
  }
}
