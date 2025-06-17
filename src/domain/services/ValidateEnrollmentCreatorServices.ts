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
  public async create(enrollDTO: EnrollRequestDTO): Promise<Enrollment> {
    const code = this.idGenerator.generete();
    const student = await this.ensureStudentExistsForEnrollmentServices.execute(enrollDTO);
    const project = await this.resolveProjectForEnrollmentServices.resolve(enrollDTO);
    const leader = await this.qualifiedLeaderFinderServices.find(enrollDTO, project);

    const enrollment: Enrollment = Enrollment.create(code, student, leader, project);

    return enrollment;
  }
}
