import { injectable } from 'tsyringe';
import { Leader } from '../../domain/entities/Leader';
import { RegisterLeader } from '../../domain/interfaces/RegisterLeader';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export interface DatasLeader {
  code: string;
  name: string;
  email: string;
}

@injectable()
export class PrismaRegisterLeader implements RegisterLeader {
  public async execute(leader: Leader): Promise<ID> {
    
    const data: DatasLeader = {
      code: leader.getCodeLeader(),
      name: leader.getNameLeader(),
      email: leader.getEmailLeader(),
    };
    const { code } = await Client.leader.create({ data });
    const idLeader: ID = ID.create(code);
    return idLeader;
  }
}
