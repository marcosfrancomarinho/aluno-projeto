import { inject, injectable } from 'tsyringe';
import { InputEnrollDTO } from '../../application/dto/InputEnrollDTO';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { PrismaRegisterStudents } from '../../infrastructure/repository/PrismaRegisterStudents';
import { PrismaSearchStudents } from '../../infrastructure/repository/PrismaSearchStudents';
import { Student } from '../entities/Student';
import { IdGenerator } from '../interfaces/IdGenerator';
import { RegisterStudents } from '../interfaces/RegisterStudents';
import { SearchStudents } from '../interfaces/SearchStudents';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

type StudentType = InputEnrollDTO['student'];

@injectable()
export class CreateStudentToEnroll {
  public constructor(
    @inject(PrismaRegisterStudents) private registerStudents: RegisterStudents,
    @inject(PrismaSearchStudents) private searchStudents: SearchStudents,
    @inject(UUID) private idGenerator: IdGenerator
  ) {}

  public async execute(input: StudentType): Promise<Student> {
    const name: Name = Name.create(input.name);
    const email: Email = Email.create(input.email);
    const registration: ID = ID.create(this.idGenerator.create());
    let student: Student = Student.create(registration, name, email);

    const studentFound: Student | null = await this.searchStudents.search(student);

    if (studentFound) {
      student = studentFound;
      return student;
    }

    await this.registerStudents.register(student);
    return student;
  }
}
