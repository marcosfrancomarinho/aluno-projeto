import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';

export interface SpecialtyExistenceFinder {
  find(specialty: Specialty): Promise<ID | null>;
}
