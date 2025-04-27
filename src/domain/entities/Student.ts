import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

export class Student {
  private constructor(private registration: ID, private name: Name, private email: Email) {}
  public getEmailStudent(): string {
    return this.email.getValue();
  }
  public getNameStudent(): string {
    return this.name.getValue();
  }
  public getRegistrationStudent(): string {
    return this.registration.getValue();
  }
  public static create(registration: ID, name: Name, email: Email): Student {
    return new Student(registration, name, email);
  }
}
