import { Leader } from '../../domain/entities/Leader';
import { IdRelateSpecialties, RelateSpecialties } from '../../domain/interfaces/RelateSpecialties';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export interface DataLeader {
  code_leader: string;
  code_project: string;
}
export class PrismaRelateSpecialties implements RelateSpecialties {
  public async execute(leader: Leader): Promise<IdRelateSpecialties> {
    const data: DataLeader = {
      code_leader: leader.getCodeLeader(),
      code_project: leader.getSpecialtyLeader(),
    };
    const { code_leader, code_project } = await Client.specialty.create({ data });
    const idLeader: ID = ID.create(code_leader);
    const idSpecialty: ID = ID.create(code_project);
    const idsRelateSpecialties: IdRelateSpecialties = { idLeader, idSpecialty };
    return idsRelateSpecialties;
  }
}
