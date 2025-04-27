import { Student } from '../entities/Student';

export interface SearchStudents {
  search(student: Student): Promise<Student | null>;
}
