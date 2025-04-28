import { Student } from '../../domain/entities/Student';
import { SearchStudents } from '../../domain/interfaces/SearchStudents';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Client } from './Client';

export class PrismaSearchStudents implements SearchStudents {
  public async execute(student: Student): Promise<Student | null> {
    const emailStudent: string = student.getEmailStudent();
    const nameStudent: string = student.getNameStudent();
    const _student = await Client.student.findUnique({ where: { email: emailStudent, name: nameStudent } });
    if (!_student) return null;
    const { email, name, registration } = _student;
    const studentClient: Student = Student.create(ID.create(registration), Name.create(name), Email.create(email));
    return studentClient;
  }
}
