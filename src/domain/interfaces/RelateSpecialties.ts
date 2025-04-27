import { Leader } from '../entities/Leader';
import { ID } from '../valueobject/ID';

export interface IdRelateSpecialties {
  idLeader: ID;
  idSpecialty: ID;
}

export interface RelateSpecialties {
  relate(leader: Leader): Promise<IdRelateSpecialties>;
}
