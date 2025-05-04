import { Leader } from '../../domain/entities/Leader';
import { LeaderFinder } from '../../domain/interfaces/LeaderFinder';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Client } from './Client';

export class PrismaLeaderFinder implements LeaderFinder {
  public async find(leader: Leader): Promise<Leader | null> {
    const email: string = leader.getEmail();
    const code: string = leader.getSpecialty();

    const leaderFound = await Client.leader.findUnique({ where: { email } });

    if (!leaderFound) return null;

    const leaderGenereted = Leader.create(
      ID.create(leaderFound.code),
      Name.create(leaderFound.name),
      Email.create(leaderFound.email),
      ID.create(code)
    );

    return leaderGenereted;
  }
}
