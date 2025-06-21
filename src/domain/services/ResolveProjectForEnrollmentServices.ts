import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { PrimaSpecialtyExistenceFinder } from '../../infrastructure/repository/PrimaSpecialtyExistenceFinder';
import { Project } from '../entities/Project';
import { SpecialtyExistenceFinder } from '../interfaces/SpecialtyExistenceFinder';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { Timestamp } from '../valueobject/Timestamp';

@injectable()
export class ResolveProjectForEnrollmentServices {
  public constructor(@inject(PrimaSpecialtyExistenceFinder) private specialtyExistenceFinder: SpecialtyExistenceFinder) { }

  public async resolve(enrollDTO: EnrollRequestDTO): Promise<Project> {
    const name: Specialty = Specialty.create(enrollDTO.getNameProject());
    const codeSpecialtyFound: ID | null = await this.specialtyExistenceFinder.find(name);
    const datahours: Timestamp = Timestamp.create(enrollDTO.getTimestamp());

    if (!codeSpecialtyFound) throw new Error('non-existent project in the institution');

    const projectCreated: Project = Project.create(codeSpecialtyFound, name, datahours);
    return projectCreated;
  }
}
