import { inject, injectable } from 'tsyringe';
import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { Enrollment } from '../entities/Enrollment';
import { EnsureStudentExistsForEnrollmentServices } from '../interfaces/EnsureStudentExistsForEnrollmentServices';
import { IdGenerator } from '../interfaces/IdGenerator';
import { QualifiedLeaderFinderServices } from '../interfaces/QualifiedLeaderFinderServices';
import { ResolveProjectForEnrollmentServices } from '../interfaces/ResolveProjectForEnrollmentServices';
import { ValidateEnrollmentCreatorServices } from '../interfaces/ValidateEnrollmentCreatorServices';
import { EnsureStudentExistsForEnrollment } from './EnsureStudentExistsForEnrollment';
import { QualifiedLeaderFinder } from './QualifiedLeaderFinder';
import { ResolveProjectForEnrollment } from './ResolveProjectForEnrollment';

@injectable()
export class ValidateEnrollmentCreator implements ValidateEnrollmentCreatorServices {
  public constructor(
    @inject(EnsureStudentExistsForEnrollment) private ensureStudentExistsForEnrollment: EnsureStudentExistsForEnrollmentServices,
    @inject(ResolveProjectForEnrollment) private resolveProjectForEnrollment: ResolveProjectForEnrollmentServices,
    @inject(QualifiedLeaderFinder) private qualifiedLeaderFinder: QualifiedLeaderFinderServices,
    @inject(UUID) private idGenerator: IdGenerator
  ) {}
  public async create(input: EnrollRequestDTO): Promise<Enrollment> {
    const code = this.idGenerator.generete();
    const student = await this.ensureStudentExistsForEnrollment.execute(input.student);
    const project = await this.resolveProjectForEnrollment.resolve(input);
    const leader = await this.qualifiedLeaderFinder.find(input.leader, project);

    const enrollment: Enrollment = Enrollment.create(code, student, leader, project);

    return enrollment;
  }
}
