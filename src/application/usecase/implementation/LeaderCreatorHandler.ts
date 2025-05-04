import { inject, injectable } from 'tsyringe';
import { Leader } from '../../../domain/entities/Leader';
import { AdvisorSpecializationCreator } from '../../../domain/interfaces/AdvisorSpecializationCreator';
import { LeaderCreator } from '../../../domain/interfaces/LeaderCreator';
import { LeaderFinder } from '../../../domain/interfaces/LeaderFinder';
import { ValidatedLeaderCreatorServices } from '../../../domain/interfaces/ValidatedLeaderCreatorServices';
import { ValidatedLeaderCreator } from '../../../domain/services/ValidatedLeaderCreator';
import { PrismaAdvisorSpecializationCreator } from '../../../infrastructure/repository/PrismaAdvisorSpecializationCreator';
import { PrismaLeaderCreator } from '../../../infrastructure/repository/PrismaLeaderCreator';
import { PrismaLeaderFinder } from '../../../infrastructure/repository/PrismaLeaderFinder';
import { LeaderRequestDTO } from '../../dto/LeaderRequestDTO';
import { LeaderResponseDTO } from '../../dto/LeaderResponseDTO';
import { LeaderCreatorUseCase } from '../interfaces/LeaderCreatorUseCase';

@injectable()
export class LeaderCreatorHandler implements LeaderCreatorUseCase {
  public constructor(
    @inject(PrismaLeaderCreator) private leaderCreator: LeaderCreator,
    @inject(PrismaLeaderFinder) private leaderFinder: LeaderFinder,
    @inject(PrismaAdvisorSpecializationCreator) private advisorSpecializationCreator: AdvisorSpecializationCreator,
    @inject(ValidatedLeaderCreator) private validatedLeaderCreator: ValidatedLeaderCreatorServices
  ) {}

  public async create(input: LeaderRequestDTO): Promise<LeaderResponseDTO> {
    const validatedLeader: Leader = await this.validatedLeaderCreator.create(input);

    const leaderFound: Leader | null = await this.leaderFinder.find(validatedLeader);

    if (!leaderFound) {
      await this.leaderCreator.create(validatedLeader);
      return await this.createSpecialization(validatedLeader);
    }

    leaderFound.updateCode(leaderFound.getCode());
    return await this.createSpecialization(leaderFound);
  }

  private async createSpecialization(leader: Leader): Promise<LeaderResponseDTO> {
    const { leaderId, specialtyId } = await this.advisorSpecializationCreator.create(leader);

    const leaderIds: LeaderResponseDTO = { leaderID: leaderId.getValue(), specialtyId: specialtyId.getValue() };

    return leaderIds;
  }
}
