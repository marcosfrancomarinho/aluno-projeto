import { Student } from '../entities/Student';

export interface SearchStudents {
  execute(student: Student): Promise<Student | null>;
}
