import { inject, injectable } from 'tsyringe';
import { PrismaSpecialistAdvisorFinder } from '../../infrastructure/repository/PrismaSpecialistAdvisorFinder';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { LeaderRequest } from '../interfaces/QualifiedLeaderFinderServices';
import { SpecialistAdvisorFinder } from '../interfaces/SearchLeaderProject';
import { Email } from '../valueobject/Email';

@injectable()
export class QualifiedLeaderFinderServices {
  public constructor(@inject(PrismaSpecialistAdvisorFinder) private specialistAdvisorFinder: SpecialistAdvisorFinder) {}

  public async find(input: LeaderRequest, project: Project): Promise<Leader> {
    const email: Email = Email.create(input.email);
    const leader: Leader | null = await this.specialistAdvisorFinder.find(email, project);

    if (!leader) throw new Error('advisor inexistent or does not have the expertise for the project');

    return leader;
  }
}
