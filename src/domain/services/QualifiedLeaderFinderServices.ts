import { EnrollRequestDTO } from '../../application/dto/EnrollRequestDTO';
import { Exception } from '../../shared/error/Exception';
import { Leader } from '../entities/Leader';
import { Project } from '../entities/Project';
import { SpecialistAdvisorFinder } from '../interfaces/SearchLeaderProject';
import { Email } from '../valueobject/Email';

export class QualifiedLeaderFinderServices {
  public constructor(private specialistAdvisorFinder: SpecialistAdvisorFinder) { }

  public async find(enrollDTO: EnrollRequestDTO, project: Project): Promise<Leader> {
    const email: Email = Email.create(enrollDTO.getEmailLeader());
    const leader: Leader | null = await this.specialistAdvisorFinder.find(email, project);

    if (!leader) throw new Exception('non-existent counselor in the institution.', 400, Exception.NO_EXIST);

    leader.isSpecialized(project.getCode());
    return leader;
  }
}
