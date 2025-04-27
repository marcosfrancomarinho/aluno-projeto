import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { Email } from '../valueobject/Email';

export interface SearchLeaderProject {
  search(email:Email, project:Project): Promise<Leader | null>;
}
