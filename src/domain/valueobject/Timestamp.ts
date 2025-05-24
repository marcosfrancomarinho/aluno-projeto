export class Timestamp {
  private constructor(private datahours: Date) {}

  public getValue(): Date {
    return this.datahours;
  }

  public getTimeMilliseconds(): number {
    return this.datahours.getTime();
  }


  public static create(datahours: string): Timestamp {
    this.validate(datahours);
    const datahoursChecked: string = this.validate(datahours);
    const datehourConverted: Date = this.convertInDate(datahoursChecked);
    const timestamp: Timestamp = new Timestamp(datehourConverted);
    this.ensureDateTimeIsValid(timestamp);
    return timestamp;
  }


  private static validate(timestamp: string): string {
    const regex: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(Z|[+-]\d{2}:\d{2})?$/;

    const checked: boolean = !!timestamp && regex.test(timestamp.trim());
    if (!checked) throw new Error(`Date ${timestamp} invalid. default(YYYY-MM-DDTHH:MH:SS).`);

    return timestamp;
  }

  private static ensureDateTimeIsValid(timestamp: Timestamp): void {
    const currentDate: Date = new Date();
    currentDate.setSeconds(0, 0);

    const currentDateInMilliseconds: number = currentDate.getTime();
    const timestampInMilliseconds: number = timestamp.getValue().getTime();

    if (timestampInMilliseconds < currentDateInMilliseconds) throw new Error('Invalid data: the provided date is in the past.');
  }

  
  private static convertInDate(timestamp: string): Date {
    const datetime: Date = new Date(timestamp.trim());
    datetime.setSeconds(0, 0);
    return datetime;
  }
}
