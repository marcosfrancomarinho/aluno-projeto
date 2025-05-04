import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Student } from '../entities/Student';

export type StudentRequest = EnrollRequestDTO['student'];

export interface EnsureStudentExistsForEnrollmentServices {
  execute(input: StudentRequest): Promise<Student>;
}
