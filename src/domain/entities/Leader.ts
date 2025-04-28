import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

export class Leader {
  private constructor(private code: ID, private name: Name, private email: Email, private specialty: ID) {}
  public getSpecialtyLeader(): string {
    return this.specialty.getValue();
  }
  public getCodeLeader(): string {
    return this.code.getValue();
  }
  public getNameLeader(): string {
    return this.name.getValue();
  }
  public getEmailLeader(): string {
    return this.email.getValue();
  }
  public updateCodeLeader(codeLeader: string): void {
    this.code = ID.create(codeLeader);
  }
  public static create(code: ID, name: Name, email: Email, specialty: ID): Leader {
    return new Leader(code, name, email, specialty);
  }
}
