import { inject, injectable } from 'tsyringe';
import { InputLeaderDTO } from '../../application/dto/InputLeaderDTO';
import { UUID } from '../../infrastructure/idgenerator/UUID';
import { PrimaSearchProjectExistence } from '../../infrastructure/repository/PrismaSearchProjectExistence';
import { Leader } from '../entities/Leader';
import { IdGenerator } from '../interfaces/IdGenerator';
import { SearchProjectExistence } from '../interfaces/SearchProjectExistence';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';
import { Specialty } from '../valueobject/Specialty';

@injectable()
export class CreateLeaderValid {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrimaSearchProjectExistence) private searchProjectExistence: SearchProjectExistence
  ) {}

  public async create({ email, name, specialty }: InputLeaderDTO): Promise<Leader> {
    const _code: ID = ID.create(this.idGenerator.create());
    const _name: Name = Name.create(name);
    const _email: Email = Email.create(email);
    const _specialty: Specialty = Specialty.create(specialty);

    const codeSpecialty: ID | null = await this.searchProjectExistence.search(_specialty);

    if (!codeSpecialty) throw new Error('specialization is not part of the projects');

    const leader: Leader = Leader.create(_code, _name, _email, codeSpecialty);
    return leader;
  }
}
