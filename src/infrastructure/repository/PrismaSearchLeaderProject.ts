import { Leader } from '../../domain/entities/Leader';
import { Project } from '../../domain/entities/Project';
import { SearchLeaderProject } from '../../domain/interfaces/SearchLeaderProject';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Client } from './Client';

export class PrismaSearchLeaderProject implements SearchLeaderProject {
  public async search(email: Email, project: Project): Promise<Leader | null> {
    const emailLeader: string = email.getValue();
    const codeProject: string = project.getCodeProject();
    const leader = await Client.leader.findUnique({
      where: { email: emailLeader, specialty: { some: { code_project: codeProject } } },
    });
    
    if (!leader) return null;

    const leaderClient: Leader = Leader.create(
      ID.create(leader.code),
      Name.create(leader.name),
      Email.create(leader.email),
      ID.create(codeProject)
    );
    return leaderClient;
  }
}
