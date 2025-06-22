import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';
import { Timestamp } from '../valueobject/Timestamp';

export class Project {
  private constructor(private code: ID, private name: Specialty, private timestamp: Timestamp) { }

  public getCode(): string {
    return this.code.getValue();
  }
  public getName(): string {
    return this.name.getValue();
  }
  public getNameRaw(): string {
    return this.name.getValueRaw();
  }
  public getTimestamp(): Date {
    return this.timestamp.getValue();
  }
  public getTimestampInMilliseconds(): number {
    return this.timestamp.getTimeMilliseconds();
  }
  public static create(code: ID, name: Specialty, timestamp: Timestamp): Project {
    return new Project(code, name, timestamp);
  }
}
