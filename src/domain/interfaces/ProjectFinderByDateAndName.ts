import { Project } from '../entities/Project';
import { Specialty } from '../valueobject/Specialty';

export interface ProjectFinderByName {
  find(specialty: Specialty): Promise<Project | null>;
}
