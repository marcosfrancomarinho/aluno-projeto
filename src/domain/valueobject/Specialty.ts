import { Exception } from "../../shared/error/Exception";

export class Specialty {
  private constructor(private specialty: string, private raw?: string) { }
  public getValue(): string {
    return this.specialty;
  }
  public getValueRaw(): string {
    if (!this.raw) throw new Exception('Value raw of specialty not defined.', 400, Exception.UNDEFINED);
    return this.raw.trim();
  }
  public static create(specialty: string): Specialty {
    this.validate(specialty);
    const formattedSpecialty: string = this.normalizeString(specialty);
    return new Specialty(formattedSpecialty, specialty);
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

  private static validate(specialty: string): void {
    const regex: RegExp = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/;
    const checked: boolean = !!specialty && regex.test(specialty.trim());
    if (!checked) throw new Exception(`specialty ${specialty} invalid`, 400, Exception.INVALID);
  }
}
