import { inject, injectable } from 'tsyringe';
import { Leader } from '../../../domain/entities/Leader';
import { RegisterLeader } from '../../../domain/interfaces/RegisterLeader';
import { RelateSpecialties } from '../../../domain/interfaces/RelateSpecialties';
import { SearchLeader } from '../../../domain/interfaces/SearchLeader';
import { PrismaRegisterLeader } from '../../../infrastructure/repository/PrismaRegisterLeader';
import { PrismaRelateSpecialties } from '../../../infrastructure/repository/PrismaRelateSpecialties';
import { PrismaSearchLeader } from '../../../infrastructure/repository/PrismaSearchLeader';
import { InputDTO } from '../../dto/leader/InputDTO';
import { OutputDTO } from '../../dto/leader/OutputDTO';
import { IRegisterLeaderUseCase } from './IRegisterLeaderUseCase';
import { LeaderServices } from '../../../domain/services/leader/LeaderServices';

@injectable()
export class RegisterLeaderUseCase implements IRegisterLeaderUseCase {
  public constructor(
    @inject(PrismaRegisterLeader) private registerLeader: RegisterLeader,
    @inject(PrismaSearchLeader) private searchLeader: SearchLeader,
    @inject(PrismaRelateSpecialties) private relateSpecialties: RelateSpecialties,
    @inject(LeaderServices) private leaderServices: LeaderServices
  ) {}

  public async register(input: InputDTO): Promise<OutputDTO> {
    const leader: Leader = await this.leaderServices.create(input);
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
