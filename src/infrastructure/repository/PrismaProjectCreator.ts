import { Project } from '../../domain/entities/Project';
import { ProjectCreator } from '../../domain/interfaces/ProjectCreator';
import { ID } from '../../domain/valueobject/ID';
import { Client } from './Client';

export type ProjectDatas = {
  code: string;
  name: string;
  raw_name: string;
  timestamp: Date;
};

export class PrismaProjectCreator implements ProjectCreator {
  public async create(project: Project): Promise<ID> {
    const data: ProjectDatas = {
      code: project.getCode(),
      name: project.getName(),
      raw_name: project.getRawName(),
      timestamp: project.getTimestamp(),
    };
    const { code } = await Client.project.create({ data });
    const idProject: ID = ID.create(code);
    return idProject;
  }
}
