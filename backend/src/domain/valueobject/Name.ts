import { Exception } from '../../shared/error/Exception';

export class Name {
  private constructor(private name: string) {}

  public getValue(): string {
    return this.name;
  }

  public static create(name: string): Name {
    this.validate(name);
    return new Name(name.trim());
  }

  private static validate(name: string): void {
    const regex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;

    if (!name) throw new Exception('Name is required.', 400, Exception.UNDEFINED);

    if (typeof name !== 'string') throw new Exception('Name must be a string.', 400, Exception.INVALID);

    if (!regex.test(name.trim())) {
      throw new Exception(
        'Name format is invalid. It must contain at least 3 letters and only alphabetic characters or spaces.',
        400,
        Exception.INVALID
      );
    }
  }
}
