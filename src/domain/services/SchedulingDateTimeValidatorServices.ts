import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Exception } from '../../shared/error/Exception';
import { Project } from '../entities/Project';
import { Scheduling } from '../entities/Scheduling';
import { IdGenerator } from '../interfaces/IdGenerator';
import { ProjectFinderByDateAndName } from '../interfaces/ProjectFinderByDateAndName';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { Timestamp } from '../valueobject/Timestamp';

export class SchedulingDateTimeValidatorServices {
  public constructor(
    private idGenerator: IdGenerator,
    private projectFinderByName: ProjectFinderByDateAndName
  ) { }

  public async validate(enrollDTO: EnrollRequestDTO): Promise<Scheduling> {
    const code: ID = this.idGenerator.generete();
    const timestamp: Timestamp = Timestamp.create(enrollDTO.getTimestamp());
    const specialty: Specialty = Specialty.create(enrollDTO.getNameProject());

    const projectFound: Project | null = await this.projectFinderByName.find(specialty);

    if (!projectFound) throw new Exception('non-existent project reported', 400, Exception.NO_EXIST);

    const scheduling: Scheduling = Scheduling.create(code, timestamp);
    scheduling.isEnrollmentDateMatchProjectDate(projectFound);

    return scheduling;
  }
}
