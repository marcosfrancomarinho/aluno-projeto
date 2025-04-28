import { inject, injectable } from 'tsyringe';
import { InputEnrollDTO } from '../../application/dto/InputEnrollDTO';
import { PrismaSearchLeaderProject } from '../../infrastructure/repository/PrismaSearchLeaderProject';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { SearchLeaderProject } from '../interfaces/SearchLeaderProject';
import { Email } from '../valueobject/Email';

type LeaderType = InputEnrollDTO['leader'];

@injectable()
export class CreateLeaderToEnroll {
  public constructor(@inject(PrismaSearchLeaderProject) private searchLeaderProject: SearchLeaderProject) {}

  public async execute(input: LeaderType, project: Project): Promise<Leader> {
    const email: Email = Email.create(input.email);
    const leader: Leader | null = await this.searchLeaderProject.search(email, project);

    if (!leader) throw new Error('advisor inexistent or does not have the expertise for the project');

    return leader;
  }
}
