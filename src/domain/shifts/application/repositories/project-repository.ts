import { Project } from "@/domain/shifts/enterprise/entities/project";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  //   save(projectShifit: Project): Promise<void>;
  //   findById(projectShifitId: string): Promise<Project | null>;
  //   delete(projectShifit: Project): Promise<void>;
}
