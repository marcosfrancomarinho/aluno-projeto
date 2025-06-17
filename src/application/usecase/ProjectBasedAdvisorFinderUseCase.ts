import { inject, injectable } from 'tsyringe';
import { Leader } from '../../domain/entities/Leader';
import { ProjectBasedAdvisorFinder } from '../../domain/interfaces/ProjectBasedAdvisorFinder';
import { Specialty } from '../../domain/valueobject/Specialty';
import { PrismaProjectBasedAdvisorFinder } from '../../infrastructure/repository/PrismaProjectBasedAdvisorFinder';
import { LeaderContactResquestDTO } from '../dto/LeaderContactRequestDTO';
import { LeaderContactResponseDTO } from '../dto/LeaderContactResponseDTO';

@injectable()
export class ProjectBasedAdvisorFinderUseCase {
  public constructor(@inject(PrismaProjectBasedAdvisorFinder) private projectBasedAdvisorFinder: ProjectBasedAdvisorFinder) { }

  public async findAll(leaderContactDTO: LeaderContactResquestDTO): Promise<LeaderContactResponseDTO[]> {
    const spcialty: Specialty = Specialty.create(leaderContactDTO.getName());

    const leaderList: Leader[] = await this.projectBasedAdvisorFinder.findAll(spcialty);

    const leaderContactResponseDTO: LeaderContactResponseDTO[] = leaderList.map((leader) => (
      new LeaderContactResponseDTO(leader.getName(), leader.getEmail(), leader.getCode())
    ));

    return leaderContactResponseDTO;
  }
}
