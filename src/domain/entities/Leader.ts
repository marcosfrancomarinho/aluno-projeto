import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';
import { Project } from './Project';

export class Leader {
  private listSpecialties: ID[];
  private constructor(private code: ID, private name: Name, private email: Email, private specialty: ID) {
    this.listSpecialties = [];
  }
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
  public setListSpecialties(spcialties: ID[]) {
    this.listSpecialties = spcialties;
  }
  public isSpecialized(projectCode: string): void {
    const specialtyEqual:boolean = this.listSpecialties.some(specialty => specialty.getValue() === projectCode);
    if(!specialtyEqual)  throw new Error("advisor not have the expertise for the project.")
  }
  public static create(code: ID, name: Name, email: Email, specialty: ID): Leader {
    return new Leader(code, name, email, specialty);
  }
}


