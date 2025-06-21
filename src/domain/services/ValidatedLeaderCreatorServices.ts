import { LeaderRequestDTO } from '../../application/dto/LeaderRequestDTO';
import { Leader } from '../entities/Leader';
import { IdGenerator } from '../interfaces/IdGenerator';
import { SpecialtyExistenceFinder } from '../interfaces/SpecialtyExistenceFinder';
import { Email } from '../valueobject/Email';
import { ID } from '../valueobject/ID';
import { Name } from '../valueobject/Name';
import { Specialty } from '../valueobject/Specialty';

export class ValidatedLeaderCreatorServices {
  public constructor(
    private idGenerator: IdGenerator,
    private specialtyExistenceFinder: SpecialtyExistenceFinder
  ) { }

  public async create(leaderDTO: LeaderRequestDTO): Promise<Leader> {
    const id: ID = this.idGenerator.generete();
    const name: Name = Name.create(leaderDTO.getName());
    const email: Email = Email.create(leaderDTO.getEmail());
    const specialty: Specialty = Specialty.create(leaderDTO.getSpecialty());

    const code: ID | null = await this.specialtyExistenceFinder.find(specialty);

    if (!code) throw new Error('specialization is not part of the projects');

    const leader: Leader = Leader.create(id, name, email, code);
    return leader;
  }
}
