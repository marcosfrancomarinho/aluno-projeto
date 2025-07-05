import { Leader } from '../entities/Leader';
import { Specialty } from '../valueobject/Specialty';

export interface ProjectBasedAdvisorFinder {
  findAll(project: Specialty): Promise<Leader[]>;
}
