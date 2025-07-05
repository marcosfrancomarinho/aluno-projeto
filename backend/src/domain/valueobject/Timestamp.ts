import { Exception } from "../../shared/error/Exception";

export class Timestamp {
  private constructor(private dateTime: Date) {}

  public getValue(): Date {
    return this.dateTime;
  }

  public getTimeMilliseconds(): number {
    return this.dateTime.getTime();
  }

  public static create(dateTimeString: string): Timestamp {
    const validatedDateTimeString = this.validate(dateTimeString);
    const dateTime = this.convertToDate(validatedDateTimeString);
    this.ensureDateTimeIsValid(dateTime);
    return new Timestamp(dateTime);
  }

  private static validate(dateTimeString: string): string {
    if (!dateTimeString) {
      throw new Exception('Timestamp is required.', 400, Exception.UNDEFINED);
    }

    if (typeof dateTimeString !== 'string') {
      throw new Exception('Timestamp must be a string.', 400, Exception.INVALID);
    }

    const trimmed = dateTimeString.trim();

    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(Z|[+-]\d{2}:\d{2})?$/;
    if (!regex.test(trimmed)) {
      throw new Exception(
        'Timestamp format is invalid. Expected format: YYYY-MM-DDTHH:MM:SS.',
        400,
        Exception.INVALID
      );
    }

    const date = new Date(trimmed);
    if (isNaN(date.getTime())) {
      throw new Exception('Timestamp value is not a valid date.', 400, Exception.INVALID);
    }

    return trimmed;
  }

  private static ensureDateTimeIsValid(date: Date): void {
    const now = this.getCurrentDateWithoutSeconds();

    if (date.getTime() < now.getTime()) {
      throw new Exception(
        'Invalid data: the provided date is in the past.',
        400,
        Exception.TIME_PAST
      );
    }
  }

  private static convertToDate(dateTimeString: string): Date {
    const date = new Date(dateTimeString);
    return this.getDateWithoutSeconds(date);
  }

  private static getCurrentDateWithoutSeconds(): Date {
    const now = new Date();
    return this.getDateWithoutSeconds(now);
  }

  private static getDateWithoutSeconds(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      0,
      0
    );
  }
}
