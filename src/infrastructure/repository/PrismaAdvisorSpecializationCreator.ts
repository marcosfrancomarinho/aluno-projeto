import { Leader } from '../../domain/entities/Leader';
import { AdvisorSpecializationCreator, SpecialtyAndAdvisorIds } from '../../domain/interfaces/AdvisorSpecializationCreator';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type DataLeader = {
  code_leader: string;
  code_project: string;
};
export class PrismaAdvisorSpecializationCreator implements AdvisorSpecializationCreator {
  public async create(leader: Leader): Promise<SpecialtyAndAdvisorIds> {
    const data: DataLeader = {
      code_leader: leader.getCode(),
      code_project: leader.getSpecialty(),
    };

    const { code_leader, code_project } = await Client.specialty.create({ data });

    const leaderId: ID = ID.create(code_leader);
    const specialtyId: ID = ID.create(code_project);

    const idsRelateSpecialties: SpecialtyAndAdvisorIds = { specialtyId, leaderId };

    return idsRelateSpecialties;
  }
}
