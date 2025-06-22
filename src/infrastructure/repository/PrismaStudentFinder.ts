import { Student } from '../../domain/entities/Student';
import { StudentFinder } from '../../domain/interfaces/StudentFinder';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Client } from './Client';

export class PrismaStudentFinder implements StudentFinder {
  public async find(student: Student): Promise<Student | null> {
    const email: string = student.getEmail();
    const name: string = student.getName();
    const studentFound = await Client.student.findUnique({ where: { email } });

    if (!studentFound) return null;

    const studentGenereted: Student = Student.create(
      ID.create(studentFound.registration),
      Name.create(studentFound.name),
      Email.create(studentFound.email)
    );

    return studentGenereted;
  }
}
