import { SpecialtyExistenceFinder } from '../../domain/interfaces/SpecialtyExistenceFinder';
import { ID } from '../../domain/valueobject/ID';
import { Specialty } from '../../domain/valueobject/Specialty';
import { Client } from './Client';

export class PrimaSpecialtyExistenceFinder implements SpecialtyExistenceFinder {
  public async find(specialty: Specialty): Promise<ID | null> {
    const name: string = specialty.getValue();

    const specialtyFound = await Client.project.findUnique({ where: { name } });

    if (!specialtyFound) return null;

    const idProject: ID = ID.create(specialtyFound.code);

    return idProject;
  }
}
