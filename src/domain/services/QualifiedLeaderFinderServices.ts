import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { SpecialistAdvisorFinder } from '../interfaces/SearchLeaderProject';
import { Email } from '../valueobject/Email';

export class QualifiedLeaderFinderServices {
  public constructor(private specialistAdvisorFinder: SpecialistAdvisorFinder) { }

  public async find(enrollDTO: EnrollRequestDTO, project: Project): Promise<Leader> {
    const email: Email = Email.create(enrollDTO.getEmailLeader());
    const leader: Leader | null = await this.specialistAdvisorFinder.find(email, project);

    if (!leader) throw new Error('non-existent counselor in the institution.');

    leader.isSpecialized(project.getCode());
    return leader;
  }
}
