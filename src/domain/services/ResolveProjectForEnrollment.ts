import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { PrimaSpecialtyExistenceFinder } from '../../infrastructure/repository/PrimaSpecialtyExistenceFinder';
import { Project } from '../entities/Project';
import { ResolveProjectForEnrollmentServices } from '../interfaces/ResolveProjectForEnrollmentServices';
import { SpecialtyExistenceFinder } from '../interfaces/SpecialtyExistenceFinder';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { Timestamp } from '../valueobject/Timestamp';

@injectable()
export class ResolveProjectForEnrollment implements ResolveProjectForEnrollmentServices {
  public constructor(@inject(PrimaSpecialtyExistenceFinder) private specialtyExistenceFinder: SpecialtyExistenceFinder) {}

  public async resolve({ project, timestamp }: EnrollRequestDTO): Promise<Project> {
    const name: Specialty = Specialty.create(project.name);
    const code: ID | null = await this.specialtyExistenceFinder.find(name);
    const datahours: Timestamp = Timestamp.create(timestamp);

    if (!code) throw new Error('non-existent project in the institution');

    const projectCreated: Project = Project.create(code, name, datahours);
    return projectCreated;
  }
}
