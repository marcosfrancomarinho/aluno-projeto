import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { Email } from '../valueobject/Email';

export interface SpecialistAdvisorFinder {
  find(email: Email, project: Project): Promise<Leader | null>;
}
