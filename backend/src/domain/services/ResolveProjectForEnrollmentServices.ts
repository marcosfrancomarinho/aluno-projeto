import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Exception } from '../../shared/error/Exception';
import { Project } from '../entities/Project';
import { SpecialtyExistenceFinder } from '../interfaces/SpecialtyExistenceFinder';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { Timestamp } from '../valueobject/Timestamp';

export class ResolveProjectForEnrollmentServices {
  public constructor(private specialtyExistenceFinder: SpecialtyExistenceFinder) {}

  public async resolve(enrollDTO: EnrollRequestDTO): Promise<Project> {
    const name: Specialty = Specialty.create(enrollDTO.getNameProject());
    const codeSpecialtyFound: ID | null = await this.specialtyExistenceFinder.find(name);
    const datahours: Timestamp = Timestamp.create(enrollDTO.getTimestamp());

    if (!codeSpecialtyFound) throw new Exception('non-existent project in the institution', 400, Exception.NO_EXIST);

    const projectCreated: Project = Project.create(codeSpecialtyFound, name, datahours);
    return projectCreated;
  }
}
