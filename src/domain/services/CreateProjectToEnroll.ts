import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { PrimaSpecialtyExistenceFinder } from '../../infrastructure/repository/PrimaSpecialtyExistenceFinder';
import { Project } from '../entities/Project';
import { SpecialtyExistenceFinder } from '../interfaces/SpecialtyExistenceFinder';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';

type EnrollRequest = EnrollRequestDTO['project'];

@injectable()
export class CreateProjectToEnroll {
  public constructor(@inject(PrimaSpecialtyExistenceFinder) private specialtyExistenceFinder: SpecialtyExistenceFinder) {}

  public async execute(input: EnrollRequest): Promise<Project> {
    const name: Specialty = Specialty.create(input.name);
    const code: ID | null = await this.specialtyExistenceFinder.find(name);

    if (!code) throw new Error('non-existent project in the institution');

    const project: Project = Project.create(code, name);
    return project;
  }
}
