import { inject, injectable } from 'tsyringe';
import { PrimaSpecialtyExistenceFinder } from '../../infrastructure/repository/PrimaSpecialtyExistenceFinder';
import { Project } from '../entities/Project';
import { SpecialtyExistenceFinder } from '../interfaces/SpecialtyExistenceFinder';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { EnrollRequest } from '../interfaces/EnsureStudentExistsForEnrollmentServices';
import { ResolveProjectForEnrollmentServices } from '../interfaces/ResolveProjectForEnrollmentServices';



@injectable()
export class ResolveProjectForEnrollment implements ResolveProjectForEnrollmentServices {
  public constructor(@inject(PrimaSpecialtyExistenceFinder) private specialtyExistenceFinder: SpecialtyExistenceFinder) {}

  public async resolve(input: EnrollRequest): Promise<Project> {
    const name: Specialty = Specialty.create(input.name);
    const code: ID | null = await this.specialtyExistenceFinder.find(name);

    if (!code) throw new Error('non-existent project in the institution');

    const project: Project = Project.create(code, name);
    return project;
  }
}
