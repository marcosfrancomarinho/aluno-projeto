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

  public async create(input: InputLeaderDTO): Promise<Leader> {
    const id: ID = ID.create(this.idGenerator.create());
    const name: Name = Name.create(input.name);
    const email: Email = Email.create(input.email);
    const specialty: Specialty = Specialty.create(input.specialty);

    const code: ID | null = await this.searchProjectExistence.search(specialty);

    if (!code) throw new Error('specialization is not part of the projects');

    const leader: Leader = Leader.create(id, name, email, code);
    return leader;
  }
}
