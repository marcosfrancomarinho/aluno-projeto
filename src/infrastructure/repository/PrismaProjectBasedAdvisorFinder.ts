import { injectable } from 'tsyringe';
import { Leader } from '../../domain/entities/Leader';
import { ProjectBasedAdvisorFinder } from '../../domain/interfaces/ProjectBasedAdvisorFinder';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Specialty } from '../../domain/valueobject/Specialty';
import { Client } from './Client';

@injectable()
export class PrismaProjectBasedAdvisorFinder implements ProjectBasedAdvisorFinder {
  public async findAll(spcialty: Specialty): Promise<Leader[]> {
    const name: string = spcialty.getValue();

    const leaderFounds = await Client.specialty.findMany({
      where: { project: { name },  },
      include: { leader: true, project: { select: { code: true } } },
    });

    const listLeaderGenereted: Leader[] = leaderFounds.map(({ leader, project }) => {
      const leaderCreated: Leader = Leader.create(
        ID.create(leader.code),
        Name.create(leader.name),
        Email.create(leader.email),
        ID.create(project.code),
      );
      return leaderCreated;
    });
    return listLeaderGenereted;
  }
}
