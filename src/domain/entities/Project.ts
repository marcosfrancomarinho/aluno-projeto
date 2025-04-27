import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';

export class Project {
  private constructor(private code: ID, private name: Specialty) {}

  public getCodeProject(): string {
    return this.code.getValue();
  }
  public getNameProject(): string {
    return this.name.getValue();
  }
  private static hasProjectRegister(code: ID | null): ID {
    if (!code) throw new Error('non-existent project in the institution');
    return code;
  }
  public static create(code: ID | null, name: Specialty): Project {
    const codeProject: ID = this.hasProjectRegister(code);
    return new Project(codeProject, name);
  }
}
