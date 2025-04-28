import { Project } from '../../domain/entities/Project';
import { CreateProject } from '../../domain/interfaces/CreateProject';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export interface DataProject {
  code: string;
  name: string;
}

export class PrismaCreateProject implements CreateProject {
  public async execute(project: Project): Promise<ID> {
    const data: DataProject = {
      code: project.getCodeProject(),
      name: project.getNameProject(),
    };
    const { code } = await Client.project.create({ data });
    const idProject: ID = ID.create(code);
    return idProject;
  }
}
