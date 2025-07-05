import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Student } from '../entities/Student';
import { IdGenerator } from '../interfaces/IdGenerator';
import { StudentCreator } from '../interfaces/StudentCreator';
import { StudentFinder } from '../interfaces/StudentFinder';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

export class EnsureStudentExistsForEnrollmentServices {
  public constructor(
    private studentCreator: StudentCreator,
    private studentFinder: StudentFinder,
    private idGenerator: IdGenerator
  ) {}

  public async execute(enrollDTO: EnrollRequestDTO): Promise<Student> {
    const name: Name = Name.create(enrollDTO.getNameStudent());
    const email: Email = Email.create(enrollDTO.getEmailStudent());
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
