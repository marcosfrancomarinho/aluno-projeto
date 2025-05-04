import { inject, injectable } from 'tsyringe';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { PrismaStudentFinder } from '../../infrastructure/repository/PrismaStudentFinder';
import { Student } from '../entities/Student';
import { IdGenerator } from '../interfaces/IdGenerator';
import { StudentCreator } from '../interfaces/StudentCreator';
import { StudentFinder } from '../interfaces/StudentFinder';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';
import { PrismaStudentCreator } from '../../infrastructure/repository/PrismaStudentCreator';
import { EnrollRequest, EnsureStudentExistsForEnrollmentServices } from '../interfaces/EnsureStudentExistsForEnrollmentServices';

@injectable()
export class EnsureStudentExistsForEnrollment implements EnsureStudentExistsForEnrollmentServices {
  public constructor(
    @inject(PrismaStudentCreator) private studentCreator: StudentCreator,
    @inject(PrismaStudentFinder) private studentFinder: StudentFinder,
    @inject(UUID) private idGenerator: IdGenerator
  ) {}

  public async execute(input: EnrollRequest): Promise<Student> {
    const name: Name = Name.create(input.name);
    const email: Email = Email.create(input.email);
    const registration: ID = this.idGenerator.generete();
    let student: Student = Student.create(registration, name, email);

    const studentFound: Student | null = await this.studentFinder.find(student);

    if (studentFound) {
      student = studentFound;
      return student;
    }

    await this.studentCreator.create(student);
    return student;
  }
}
