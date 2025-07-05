import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Enrollment } from '../entities/Enrollment';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { Student } from '../entities/Student';
import { IdGenerator } from '../interfaces/IdGenerator';
import { EnsureStudentExistsForEnrollmentServices } from './EnsureStudentExistsForEnrollmentServices';
import { QualifiedLeaderFinderServices } from './QualifiedLeaderFinderServices';
import { ResolveProjectForEnrollmentServices } from './ResolveProjectForEnrollmentServices';

export class ValidateEnrollmentCreatorServices {
  public constructor(
    private ensureStudentExistsForEnrollmentServices: EnsureStudentExistsForEnrollmentServices,
    private resolveProjectForEnrollmentServices: ResolveProjectForEnrollmentServices,
    private qualifiedLeaderFinderServices: QualifiedLeaderFinderServices,
    private idGenerator: IdGenerator
  ) {}
  public async create(enrollDTO: EnrollRequestDTO): Promise<Enrollment> {
    const code = this.idGenerator.generete();
    const student: Student = await this.ensureStudentExistsForEnrollmentServices.execute(enrollDTO);
    const project: Project = await this.resolveProjectForEnrollmentServices.resolve(enrollDTO);
    const leader: Leader = await this.qualifiedLeaderFinderServices.find(enrollDTO, project);

    const enrollment: Enrollment = Enrollment.create(code, student, leader, project);

    return enrollment;
  }
}
