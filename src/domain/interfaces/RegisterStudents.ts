import { Student } from '../entities/Student';
import { ID } from '../valueobject/ID';

export interface RegisterStudents {
  register(student: Student): Promise<ID>;
}
