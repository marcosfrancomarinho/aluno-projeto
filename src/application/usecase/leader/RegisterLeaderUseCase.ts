import { inject, injectable } from 'tsyringe';
import { IdGenerator } from '../../../domain/interfaces/IdGenerator';
import { InputDTO } from '../../dto/leader/InputDTO';
import { OutputDTO } from '../../dto/leader/OutputDTO';
import { IRegisterLeaderUseCase } from './IRegisterLeaderUseCase';
import { UUID } from '../../../infrastructure/idgenerator/UUID';
import { PrismaRegisterLeader } from '../../../infrastructure/repository/PrismaRegisterLeader';
import { RegisterLeader } from '../../../domain/interfaces/RegisterLeader';
import { Name } from '../../../domain/valueobject/Name';
import { ID } from '../../../domain/valueobject/ID';
import { Specialty } from '../../../domain/valueobject/Specialty';
import { Leader } from '../../../domain/entities/Leader';
import { PrimaSearchProjectExistence } from '../../../infrastructure/repository/PrismaSearchProjectExistence';
import { SearchProjectExistence } from '../../../domain/interfaces/SearchProjectExistence';
import { Email } from '../../../domain/valueobject/Email';
import { PrismaRelateSpecialties } from '../../../infrastructure/repository/PrismaRelateSpecialties';
import { RelateSpecialties } from '../../../domain/interfaces/RelateSpecialties';
import { PrismaSearchLeader } from '../../../infrastructure/repository/PrismaSearchLeader';
import { SearchLeader } from '../../../domain/interfaces/SearchLeader';

@injectable()
export class RegisterLeaderUseCase implements IRegisterLeaderUseCase {
  public constructor(
    @inject(UUID) private idGenerator: IdGenerator,
    @inject(PrismaRegisterLeader) private registerLeader: RegisterLeader,
    @inject(PrimaSearchProjectExistence) private searchProjectExistence: SearchProjectExistence,
    @inject(PrismaSearchLeader) private searchLeader: SearchLeader,
    @inject(PrismaRelateSpecialties) private relateSpecialties: RelateSpecialties
  ) {}

  public async register(input: InputDTO): Promise<OutputDTO> {
    const code: ID = ID.create(this.idGenerator.create());
    const name: Name = Name.create(input.name);
    const email: Email = Email.create(input.email);
    const specialty: Specialty = Specialty.create(input.specialty);

    const codeProject: ID | null = await this.searchProjectExistence.search(specialty);
    const leader: Leader = Leader.create(code, name, email, codeProject);
    const responseSearchLeader: Leader | null = await this.searchLeader.search(leader);

    if (responseSearchLeader) {
      leader.updateCodeLeader(responseSearchLeader.getCodeLeader());
      return await this.createRelateSpecialties(leader);
    }
    await this.registerLeader.register(leader);
    return await this.createRelateSpecialties(leader);
  }

  private async createRelateSpecialties(leader: Leader): Promise<OutputDTO> {
    const { idLeader } = await this.relateSpecialties.relate(leader);
    const ID: OutputDTO = { idLeader: idLeader.getValue() };
    return ID;
  }
}
