import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { PrismaProjectFinderByName } from '../../infrastructure/repository/PrismaProjectFinderByName';
import { Project } from '../entities/Project';
import { Scheduling } from '../entities/Scheduling';
import { IdGenerator } from '../interfaces/IdGenerator';
import { ProjectFinderByName } from '../interfaces/ProjectFinderByDateAndName';
import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { Timestamp } from '../valueobject/Timestamp';

@injectable()
export class SchedulingDateTimeValidatorServices  {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaProjectFinderByName) private projectFinderByName: ProjectFinderByName
  ) {}

  public async validate(enrollDTO: EnrollRequestDTO): Promise<Scheduling> {
    const code: ID = this.idGenerator.generete();
    const timestamp: Timestamp = Timestamp.create(enrollDTO.getTimestamp());
    const specialty: Specialty = Specialty.create(enrollDTO.getNameProject());

    const projectFound: Project | null = await this.projectFinderByName.find(specialty);

    if (!projectFound) throw new Error('non-existent project reported');

    const scheduling: Scheduling = Scheduling.create(code, timestamp);
    scheduling.isEnrollmentDateMatchProjectDate(projectFound);

    return scheduling;
  }
}
