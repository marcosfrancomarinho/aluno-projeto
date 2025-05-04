import { Project } from '../../domain/entities/Project';
import { ProjectCreator } from '../../domain/interfaces/ProjectCreator';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type DatasProject = {
  code: string;
  name: string;
};

export class PrismaProjectCreator implements ProjectCreator {
  public async create(project: Project): Promise<ID> {
    const data: DatasProject = {
      code: project.getCode(),
      name: project.getName(),
    };
    const { code } = await Client.project.create({ data });
    const idProject: ID = ID.create(code);
    return idProject;
  }
}
