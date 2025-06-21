import { Leader } from '../../domain/entities/Leader';
import { LeaderCreator } from '../../domain/interfaces/LeaderCreator';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type DatasLeader = {
  code: string;
  name: string;
  email: string;
};

export class PrismaLeaderCreator implements LeaderCreator {
  public async create(leader: Leader): Promise<ID> {
    const data: DatasLeader = {
      code: leader.getCode(),
      name: leader.getName(),
      email: leader.getEmail(),
    };
    const { code } = await Client.leader.create({ data });
    const idLeader: ID = ID.create(code);
    return idLeader;
  }
}
