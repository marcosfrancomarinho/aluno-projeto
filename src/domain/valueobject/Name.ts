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
    const checked: boolean = !!name && regex.test(name.trim());
    if (!checked) throw new Error('name invalid');
  }
}
