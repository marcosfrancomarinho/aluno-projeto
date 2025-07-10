import { Exception } from '../../shared/error/Exception';

export class Specialty {
  private constructor(private specialty: string, private raw?: string) {}
  public getValue(): string {
    return this.specialty;
  }
  public getValueRaw(): string {
    if (!this.raw) throw new Exception('Value raw of specialty not defined.', 400, Exception.UNDEFINED);
    return this.raw;
  }
  public static create(specialty: string): Specialty {
    const rawSpecialty: string = this.validate(specialty);
    const formattedSpecialty: string = this.normalizeString(specialty);
    return new Specialty(formattedSpecialty, rawSpecialty);
  }
  public static with(specialty: string): Specialty {
    return new Specialty(specialty);
  }
  private static normalizeString(specialty: string) {
    return specialty
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_');
  }

  private static validate(specialty: string): string {
    const regex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;

    if (!specialty) throw new Exception('Specialty is required.', 400, Exception.UNDEFINED);

    if (typeof specialty !== 'string') throw new Exception('Specialty must be a string.', 400, Exception.INVALID);

    if (!regex.test(specialty.trim())) {
      throw new Exception(
        `Specialty "${specialty.trim()}" is invalid. It must have at least 3 letters and contain only alphabetic characters or spaces.`,
        400,
        Exception.INVALID
      );
    }
    return specialty.trim().toLowerCase();
  }
}
