import { ID } from '../valueobject/ID';
import { Specialty } from '../valueobject/Specialty';

export interface SearchProjectExistence {
  search(specialty: Specialty): Promise<ID | null>;
}
