import { Project } from '../entities/Project';

export interface AllProjectFinder {
  findAll(): Promise<Project[]>;
}
