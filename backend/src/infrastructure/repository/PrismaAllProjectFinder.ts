import { Project } from '../../domain/entities/Project';
import { AllProjectFinder } from '../../domain/interfaces/AllProjectFinder';
import { ID } from '../../domain/valueobject/ID';
import { Specialty } from '../../domain/valueobject/Specialty';
import { Timestamp } from '../../domain/valueobject/Timestamp';
import { Client } from './Client';

export class PrismaAllProjectFinder implements AllProjectFinder {
  public async findAll(): Promise<Project[]> {
    const foundAllProject = await Client.project.findMany();

    const allProjects: Project[] = foundAllProject.map((project) => {
      const code: ID = ID.create(project.code);
      const specialty: Specialty = Specialty.create(project.raw_name);
      const timestamp: Timestamp = Timestamp.create(project.timestamp.toISOString());
      return Project.create(code, specialty, timestamp);
    });
    return allProjects;
  }
}
