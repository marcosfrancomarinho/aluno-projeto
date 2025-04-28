import { inject, injectable } from 'tsyringe';
import { InputDTO } from '../../../application/dto/enroll/InputDTO';
import { PrismaSearchLeaderProject } from '../../../infrastructure/repository/PrismaSearchLeaderProject';
import { Leader } from '../../entities/Leader';
import { Project } from '../../entities/Project';
import { SearchLeaderProject } from '../../interfaces/SearchLeaderProject';
import { Email } from '../../valueobject/Email';

type LeaderType = InputDTO['leader'];

@injectable()
export class LeaderServices {
  public constructor(@inject(PrismaSearchLeaderProject) private searchLeaderProject: SearchLeaderProject) {}

  public async create({ email }: LeaderType, project: Project): Promise<Leader> {
    const emailLeader: Email = Email.create(email);
    const leader: Leader | null = await this.searchLeaderProject.search(emailLeader, project);

    if (!leader) throw new Error('advisor inexistent or does not have the expertise for the project');
    
    return leader;
  }
}
