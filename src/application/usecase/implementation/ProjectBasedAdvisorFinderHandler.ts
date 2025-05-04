import { inject, injectable } from 'tsyringe';
import { Leader } from '../../../domain/entities/Leader';
import { ProjectBasedAdvisorFinder } from '../../../domain/interfaces/ProjectBasedAdvisorFinder';
import { Specialty } from '../../../domain/valueobject/Specialty';
import { PrismaProjectBasedAdvisorFinder } from '../../../infrastructure/repository/PrismaProjectBasedAdvisorFinder';
import { LeaderContactResquestDTO } from '../../dto/LeaderContactRequestDTO';
import { LeaderContactResponseDTO } from '../../dto/LeaderContactResponseDTO';
import { ProjectBasedAdvisorFinderUseCase } from '../interfaces/ProjectBasedAdvisorFinderUseCase';

@injectable()
export class ProjectBasedAdvisorFinderHandler implements ProjectBasedAdvisorFinderUseCase {
  public constructor(@inject(PrismaProjectBasedAdvisorFinder) private projectBasedAdvisorFinder: ProjectBasedAdvisorFinder) {}

  public async findAll(input: LeaderContactResquestDTO): Promise<LeaderContactResponseDTO[]> {
    const spcialty: Specialty = Specialty.create(input.name);

    const leaderList: Leader[] = await this.projectBasedAdvisorFinder.findAll(spcialty);

    const LeaderContacts: LeaderContactResponseDTO[] = leaderList.map((leader) => {
      return {
        leaderId: leader.getCode(),
        name: leader.getName(),
        email: leader.getEmail(),
      };
    });

    return LeaderContacts;
  }
}
