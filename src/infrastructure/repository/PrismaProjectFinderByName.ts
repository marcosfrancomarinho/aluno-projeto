import { Project } from '../../domain/entities/Project';
import { ProjectFinderByName } from '../../domain/interfaces/ProjectFinderByDateAndName';
import { ID } from '../../domain/valueobject/ID';
import { Specialty } from '../../domain/valueobject/Specialty';
import { Timestamp } from '../../domain/valueobject/Timestamp';
import { Client } from './Client';

export class PrismaProjectFinderByName implements ProjectFinderByName {
  public async find(specialty: Specialty): Promise<Project | null> {
    const projectName: string = specialty.getValue();
    const projectFound = await Client.project.findUnique({ where: { name: projectName } });

    if (!projectFound) return null;

    const projectGenereted: Project = Project.create(
      ID.create(projectFound.code),
      Specialty.with(projectFound.name),
      Timestamp.create(projectFound.timestamp.toISOString())
    );

    return projectGenereted;
  }
}
