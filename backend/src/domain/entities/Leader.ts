import { Exception } from '../../shared/error/Exception';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';

export class Leader {
  private constructor(
    private code: ID,
    private name: Name,
    private email: Email,
    private specialty: ID,
    private listSpecialties?: ID[]
  ) {}
  public getSpecialty(): string {
    return this.specialty.getValue();
  }
  public getCode(): string {
    return this.code.getValue();
  }
  public getName(): string {
    return this.name.getValue();
  }
  public getEmail(): string {
    return this.email.getValue();
  }

  public isSpecialized(projectCode: string): void {
    if (!this.listSpecialties)
      throw new Exception('list of specialties do leader has not been defined', 400, Exception.UNDEFINED);
    const specialtyEqual: boolean = this.listSpecialties.some((specialty) => specialty.getValue() === projectCode);
    if (!specialtyEqual) throw new Exception('advisor not have the expertise for the project.', 400, Exception.NO_SPECIALTY);
  }
  public static create(code: ID, name: Name, email: Email, specialty: ID, listSpecialties?: ID[]): Leader {
    return new Leader(code, name, email, specialty, listSpecialties);
  }
}
