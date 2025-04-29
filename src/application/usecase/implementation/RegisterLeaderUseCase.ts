import { inject, injectable } from 'tsyringe';
import { Leader } from '../../../domain/entities/Leader';
import { RegisterLeader } from '../../../domain/interfaces/RegisterLeader';
import { RelateSpecialties } from '../../../domain/interfaces/RelateSpecialties';
import { SearchLeader } from '../../../domain/interfaces/SearchLeader';
import { CreateLeaderValid } from '../../../domain/services/CreateLeaderValid';
import { PrismaRegisterLeader } from '../../../infrastructure/repository/PrismaRegisterLeader';
import { PrismaRelateSpecialties } from '../../../infrastructure/repository/PrismaRelateSpecialties';
import { PrismaSearchLeader } from '../../../infrastructure/repository/PrismaSearchLeader';
import { InputLeaderDTO } from '../../dto/InputLeaderDTO';
import { OutputLeaderDTO } from '../../dto/OutputLeaderDTO';
import { IRegisterLeaderUseCase } from '../interfaces/IRegisterLeaderUseCase';

@injectable()
export class RegisterLeaderUseCase implements IRegisterLeaderUseCase {
  public constructor(
    @inject(PrismaRegisterLeader) private registerLeader: RegisterLeader,
    @inject(PrismaSearchLeader) private searchLeader: SearchLeader,
    @inject(PrismaRelateSpecialties) private relateSpecialties: RelateSpecialties,
    @inject(CreateLeaderValid) private leaderValid: CreateLeaderValid
  ) {}

  public async register(input: InputLeaderDTO): Promise<OutputLeaderDTO> {
    const leader: Leader = await this.leaderValid.create(input);
    const leaderFound: Leader | null = await this.searchLeader.execute(leader);

    if (!leaderFound) {
      await this.registerLeader.execute(leader);
      return await this.createRelateSpecialties(leader);
    }
    
    leader.updateCode(leaderFound.getCodeLeader());
    return await this.createRelateSpecialties(leader);
  }

  private async createRelateSpecialties(leader: Leader): Promise<OutputLeaderDTO> {
    const { idLeader } = await this.relateSpecialties.execute(leader);
    const ID: OutputLeaderDTO = { idLeader: idLeader.getValue() };
    return ID;
  }
}
