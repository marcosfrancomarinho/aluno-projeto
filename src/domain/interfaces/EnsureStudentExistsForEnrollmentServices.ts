import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Student } from '../entities/Student';

export type EnrollRequest = EnrollRequestDTO['student'];

export interface EnsureStudentExistsForEnrollmentServices {
  execute(input: EnrollRequest): Promise<Student>;
}
