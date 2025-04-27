import { injectable } from 'tsyringe';
import { Student } from '../../domain/entities/Student';
import { RegisterStudents } from '../../domain/interfaces/RegisterStudents';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export interface DatasStudents {
  registration: string;
  name: string;
  email: string;
}

@injectable()
export class PrismaRegisterStudents implements RegisterStudents {
  public async register(student: Student): Promise<ID> {
    const data: DatasStudents = {
      registration: student.getRegistrationStudent(),
      name: student.getNameStudent(),
      email: student.getEmailStudent(),
    };
    const { registration } = await Client.student.create({ data });
    const idStudent: ID = ID.create(registration);
    return idStudent;
  }
}
