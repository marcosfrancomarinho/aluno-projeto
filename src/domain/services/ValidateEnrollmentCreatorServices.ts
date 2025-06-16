import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { Enrollment } from '../entities/Enrollment';
import { IdGenerator } from '../interfaces/IdGenerator';
import { EnsureStudentExistsForEnrollmentServices } from './EnsureStudentExistsForEnrollmentServices';
import { QualifiedLeaderFinderServices } from './QualifiedLeaderFinderServices';
import { ResolveProjectForEnrollmentServices } from './ResolveProjectForEnrollmentServices';

@injectable()
export class ValidateEnrollmentCreatorServices {
  public constructor(
    @inject(EnsureStudentExistsForEnrollmentServices) private ensureStudentExistsForEnrollmentServices: EnsureStudentExistsForEnrollmentServices,
    @inject(ResolveProjectForEnrollmentServices) private resolveProjectForEnrollmentServices: ResolveProjectForEnrollmentServices,
    @inject(QualifiedLeaderFinderServices) private qualifiedLeaderFinderServices: QualifiedLeaderFinderServices,
    @inject(UUID) private idGenerator: IdGenerator
  ) { }
  public async create(input: EnrollRequestDTO): Promise<Enrollment> {
    const code = this.idGenerator.generete();
    const student = await this.ensureStudentExistsForEnrollmentServices.execute(input);
    const project = await this.resolveProjectForEnrollmentServices.resolve(input);
    const leader = await this.qualifiedLeaderFinderServices.find(input, project);

    const enrollment: Enrollment = Enrollment.create(code, student, leader, project);

    return enrollment;
  }
}
