import { Student } from '../entities/Student';

export interface StudentFinder {
  find(student: Student): Promise<Student | null>;
}
