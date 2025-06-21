import { Leader } from '../../domain/entities/Leader';
import { AdvisorSpecializationCreator } from '../../domain/interfaces/AdvisorSpecializationCreator';
import { LeaderCreator } from '../../domain/interfaces/LeaderCreator';
import { LeaderFinder } from '../../domain/interfaces/LeaderFinder';
import { ValidatedLeaderCreatorServices } from '../../domain/services/ValidatedLeaderCreatorServices';
import { LeaderRequestDTO } from '../dto/LeaderRequestDTO';
import { LeaderResponseDTO } from '../dto/LeaderResponseDTO';

export class LeaderCreatorUseCase {
  public constructor(
    private leaderCreator: LeaderCreator,
    private leaderFinder: LeaderFinder,
    private advisorSpecializationCreator: AdvisorSpecializationCreator,
    private validatedLeaderCreatorServices: ValidatedLeaderCreatorServices
  ) { }

  public async create(leaderDTO: LeaderRequestDTO): Promise<LeaderResponseDTO> {
    const validatedLeader: Leader = await this.validatedLeaderCreatorServices.create(leaderDTO);

    const leaderFound: Leader | null = await this.leaderFinder.find(validatedLeader);

    if (!leaderFound) {
      await this.leaderCreator.create(validatedLeader);
      return await this.createSpecialization(validatedLeader);
    }

    return await this.createSpecialization(leaderFound);
  }

  private async createSpecialization(leader: Leader): Promise<LeaderResponseDTO> {
    const { leaderId, specialtyId } = await this.advisorSpecializationCreator.create(leader);

    const leaderResponseDTO: LeaderResponseDTO = new LeaderResponseDTO(leaderId.getValue(), specialtyId.getValue());

    return leaderResponseDTO;
  }
}
