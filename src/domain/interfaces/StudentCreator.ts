import { Student } from '../entities/Student';
import { ID } from '../valueobject/ID';

export interface StudentCreator {
  create(student: Student): Promise<void>;
}
