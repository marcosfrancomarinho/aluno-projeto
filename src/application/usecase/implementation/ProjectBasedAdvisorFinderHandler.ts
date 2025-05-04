import { inject, injectable } from 'tsyringe';
import { Specialty } from '../../../domain/valueobject/Specialty';
import { LeaderContactResponseDTO } from '../../dto/LeaderContactResponseDTO';
import { ProjectRequestDTO } from '../../dto/ProjectRequestDTO';
import { ProjectBasedAdvisorFinderUseCase } from '../interfaces/ProjectBasedAdvisorFinderUseCase';
import { PrismaProjectBasedAdvisorFinder } from '../../../infrastructure/repository/PrismaProjectBasedAdvisorFinder';
import { ProjectBasedAdvisorFinder } from '../../../domain/interfaces/ProjectBasedAdvisorFinder';
import { Leader } from '../../../domain/entities/Leader';

@injectable()
export class ProjectBasedAdvisorFinderHandler implements ProjectBasedAdvisorFinderUseCase {
  public constructor(@inject(PrismaProjectBasedAdvisorFinder) private projectBasedAdvisorFinder: ProjectBasedAdvisorFinder) {}

  public async findAll(input: ProjectRequestDTO): Promise<LeaderContactResponseDTO[]> {
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
