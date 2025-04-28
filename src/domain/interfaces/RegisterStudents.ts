import { Student } from '../entities/Student';
import { ID } from '../valueobject/ID';

export interface RegisterStudents {
  execute(student: Student): Promise<ID>;
}
