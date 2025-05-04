import { Leader } from '../entities/Leader';
import { ID } from '../valueobject/ID';

export type SpecialtyAndAdvisorIds = {
  leaderId: ID;
  specialtyId: ID;
};

export interface AdvisorSpecializationCreator {
  create(leader: Leader): Promise<SpecialtyAndAdvisorIds>;
}
