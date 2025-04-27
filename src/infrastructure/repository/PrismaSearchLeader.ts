import { Leader } from '../../domain/entities/Leader';
import { SearchLeader } from '../../domain/interfaces/SearchLeader';
import { Email } from '../../domain/valueobject/Email';
import { ID } from '../../domain/valueobject/ID';
import { Name } from '../../domain/valueobject/Name';
import { Client } from './Client';

export class PrismaSearchLeader implements SearchLeader {
  public async search(_leader: Leader): Promise<Leader | null> {
    const emailLeader: string = _leader.getEmailLeader();
    const codeLeader: string = _leader.getSpecialtyLeader();
    const leader = await Client.leader.findUnique({ where: { email: emailLeader } });
    if (!leader) return null;
    const { code, email, name } = leader;
    const leaderClient: Leader = Leader.create(ID.create(code), Name.create(name), Email.create(email), ID.create(codeLeader));
    return leaderClient;
  }
}
