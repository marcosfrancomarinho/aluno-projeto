export class Specialty {
  private constructor(private specialty: string) {}

  public getValue(): string {
    return this.specialty;
  }

  public static create(specialty: string): Specialty {
    this.validate(specialty);
    const formattedSpecialty: string = this.normalizeString(specialty);
    return new Specialty(formattedSpecialty);
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
    if (!checked) throw new Error(`specialty /${specialty}/ invalid`);
  }
}

