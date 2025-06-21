import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

export class Leader {
  private constructor(private code: ID, private name: Name, private email: Email, private specialty: ID) { }
  public getSpecialty(): string {
    return this.specialty.getValue();
  }
  public getCode(): string {
    return this.code.getValue();
  }
  public getName(): string {
    return this.name.getValue();
  }
  public getEmail(): string {
    return this.email.getValue();
  }

  public static create(code: ID, name: Name, email: Email, specialty: ID): Leader {
    return new Leader(code, name, email, specialty);
  }
}


