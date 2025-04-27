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
    const checked: boolean = !!id && regex.test(id.trim());
    if (!checked) throw new Error('identifier invalid.');
  }
}
