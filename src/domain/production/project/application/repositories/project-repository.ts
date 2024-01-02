import { PaginationParams } from "@/core/repositories/pagination-params";
import { Project } from "@/domain/production/project/enterprise/entities/project";

export interface ProjectRepository {
  create(project: Project): Promise<void>;
  findMany(
    params: PaginationParams,
    projectCode?: string,
    description?: string,
    city?: string,
    utd?: string
  ): Promise<Array<Project>>;
  save(project: Project): Promise<void>;
  findById(projectId: string): Promise<Project | null>;
}
