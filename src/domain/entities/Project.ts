import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';

export class Project {
  private constructor(private code: ID, private name: Specialty) {}

  public getCode(): string {
    return this.code.getValue();
  }
  public getName(): string {
    return this.name.getValue();
  }
  public static create(code: ID, name: Specialty): Project {
    return new Project(code, name);
  }
}
