import { SearchProjectExistence } from '../../domain/interfaces/SearchProjectExistence';
import { ID } from '../../domain/valueobject/ID';
import { Specialty } from '../../domain/valueobject/Specialty';
import { Client } from './Client';

export class PrimaSearchProjectExistence implements SearchProjectExistence {
  public async search(specialty: Specialty): Promise<ID | null> {
    const name: string = specialty.getValue();
    const projectClient = await Client.project.findUnique({ where: { name } });
    if (!projectClient) return null;
    const { code } = projectClient;
    const idProject: ID = ID.create(code);
    return idProject;
  }
}
