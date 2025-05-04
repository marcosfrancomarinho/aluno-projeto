import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

export class Leader {
  private constructor(private code: ID, private name: Name, private email: Email, private specialty: ID) {}
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
  public updateCode(codeLeader: string): void {
    this.code = ID.create(codeLeader);
  }
  public static create(code: ID, name: Name, email: Email, specialty: ID): Leader {
    return new Leader(code, name, email, specialty);
  }
}


// SELECT l.code, l.name, l.email, p.name 
// FROM spcialty AS s
// INNER JOIN leader l ON l.code = s.code_leader
// INNER JOIN project p ON p.code = s.code_project
// WHERE l.name = ??