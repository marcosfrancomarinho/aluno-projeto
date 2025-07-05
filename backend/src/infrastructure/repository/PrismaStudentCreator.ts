import { Student } from '../../domain/entities/Student';
import { StudentCreator } from '../../domain/interfaces/StudentCreator';
import { Client } from './Client';

export type DatasStudent = {
  registration: string;
  name: string;
  email: string;
};

export class PrismaStudentCreator implements StudentCreator {
  public async create(student: Student): Promise<void> {
    const data: DatasStudent = {
      registration: student.getRegistration(),
      name: student.getName(),
      email: student.getEmail(),
    };
    await Client.student.create({ data });

  }
}
