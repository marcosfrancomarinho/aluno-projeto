import { Exception } from '../../shared/error/Exception';

export class ID {
  private constructor(private id: string) {}
  public getValue(): string {
    return this.id;
  }
  public static create(id: string): ID {
    this.validate(id);
    return new ID(id.trim());
  }
  private static validate(id: string): void {
    const regex: RegExp = /^[a-zA-Z0-9-]+$/;

    if (!id) throw new Exception('Identifier is required.', 400, Exception.UNDEFINED);

    if (typeof id !== 'string') throw new Exception('Identifier must be a string.', 400, Exception.INVALID);

    if (!regex.test(id.trim())) {
      throw new Exception('Identifier format is invalid. Only alphanumerics and hyphens are allowed.', 400, Exception.INVALID);
    }
  }
}
