import { Leader } from '../../domain/entities/Leader';
import { Project } from '../../domain/entities/Project';
import { SpecialistAdvisorFinder } from '../../domain/interfaces/SearchLeaderProject';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Client } from './Client';

export class PrismaSpecialistAdvisorFinder implements SpecialistAdvisorFinder {
  public async find(email: Email, project: Project): Promise<Leader | null> {
    const emailLeader: string = email.getValue();
    const codeProject: string = project.getCode();

    const leader = await Client.leader.findUnique({
      where: { email: emailLeader },
      include: { specialty: true },
    });

    if (!leader) return null;

    const listProjects: ID[] = leader.specialty.map(({ code_project }) => ID.create(code_project));

    const leaderGenereted: Leader = Leader.create(
      ID.create(leader.code),
      Name.create(leader.name),
      Email.create(leader.email),
      ID.create(codeProject)
    );

    leaderGenereted.setListSpecialties(listProjects);
    
    return leaderGenereted;
  }
}