import { PaginationParams } from "@/core/repositories/pagination-params";
import { Project } from "@/domain/shifts/enterprise/entities/project";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  findMany(
    params: PaginationParams,
    projectCode?: string,
    description?: string,
    city?: string,
    utd?: string
  ): Promise<Array<Project>>;
  //   save(projectShifit: Project): Promise<void>;
  //   findById(projectShifitId: string): Promise<Project | null>;
  //   delete(projectShifit: Project): Promise<void>;
}
