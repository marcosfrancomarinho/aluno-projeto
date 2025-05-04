import { inject, injectable } from 'tsyringe';
import { Scheduling } from '../entities/Scheduling';
import { SchedulingDateTimeValidatorServices } from '../interfaces/SchedulingDateTimeValidatorServices';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { IdGenerator } from '../interfaces/IdGenerator';
import { ID } from '../valueobject/ID';
import { Timestamp } from '../valueobject/Timestamp';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Specialty } from '../valueobject/Specialty';
import { PrismaProjectFinderByName } from '../../infrastructure/repository/PrismaProjectFinderByName';
import { ProjectFinderByName } from '../interfaces/ProjectFinderByDateAndName';
import { Project } from '../entities/Project';

@injectable()
export class SchedulingDateTimeValidator implements SchedulingDateTimeValidatorServices {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaProjectFinderByName) private projectFinderByName: ProjectFinderByName
  ) {}

  public async validate(input: EnrollRequestDTO): Promise<Scheduling> {
    const code: ID = this.idGenerator.generete();
    const timestamp: Timestamp = Timestamp.create(input.timestamp);
    const specialty: Specialty = Specialty.create(input.project.name);

    const projectFound: Project | null = await this.projectFinderByName.find(specialty);

    if (!projectFound) throw new Error('non-existent project reported');

    const scheduling: Scheduling = Scheduling.create(code, timestamp);
    scheduling.isEnrollmentDateMatchProjectDate(projectFound);

    return scheduling;
  }
}
