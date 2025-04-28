import { inject, injectable } from 'tsyringe';
import { InputDTO } from '../../../application/dto/leader/InputDTO';
import { Email } from '../../valueobject/Email';
import { ID } from '../../valueobject/ID';
import { Name } from '../../valueobject/Name';
import { Specialty } from '../../valueobject/Specialty';
import { IdGenerator } from '../../interfaces/IdGenerator';
import { UUID } from '../../../infrastructure/idgenerator/UUID';
import { Leader } from '../../entities/Leader';
import { PrimaSearchProjectExistence } from '../../../infrastructure/repository/PrismaSearchProjectExistence';
import { SearchProjectExistence } from '../../interfaces/SearchProjectExistence';

@injectable()
export class LeaderServices {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrimaSearchProjectExistence) private searchProjectExistence: SearchProjectExistence
  ) {}

  public async create({ email, name, specialty }: InputDTO): Promise<Leader> {
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
