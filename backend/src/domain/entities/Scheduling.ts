import { Exception } from '../../shared/error/Exception';
import { ID } from '../valueobject/ID';
import { Timestamp } from '../valueobject/Timestamp';
import { Project } from './Project';

export class Scheduling {
  private constructor(private code: ID, private timestamp: Timestamp) { }

  public getPersistenceData() {
    return {
      code: this.code.getValue(),
      timestamp: this.timestamp.getValue(),
    };
  }

  public static create(code: ID, timestamp: Timestamp): Scheduling {
    return new Scheduling(code, timestamp);
  }

  public isEnrollmentDateMatchProjectDate(project: Project): void {
    const projectDateInMilliseconds: number = project.getTimestampInMilliseconds();
    const registrationDateInMilliseconds: number = this.timestamp.getTimeMilliseconds();

    if (projectDateInMilliseconds !== registrationDateInMilliseconds) {
      throw new Exception(
        `The provided date and time do not match the project's scheduled date and time, 
        date project is : ${project.getTimestamp()}`,
        400,
        Exception.TIME_NOT_MATCH
      );
    }
  }
}
