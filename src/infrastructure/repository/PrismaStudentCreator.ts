import { injectable } from 'tsyringe';
import { Student } from '../../domain/entities/Student';
import { StudentCreator } from '../../domain/interfaces/StudentCreator';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type DatasStudent = {
  registration: string;
  name: string;
  email: string;
};

@injectable()
export class PrismaStudentCreator implements StudentCreator {
  public async create(student: Student): Promise<ID> {
    const data: DatasStudent = {
      registration: student.getRegistration(),
      name: student.getName(),
      email: student.getEmailStudent(),
    };

    const { registration } = await Client.student.create({ data });

    const idStudent: ID = ID.create(registration);

    return idStudent;
  }
}
