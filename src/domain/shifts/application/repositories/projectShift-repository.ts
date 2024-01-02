import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShift";

export interface ProjectShiftRepository {
  create(projectShift: ProjectShift): Promise<void>;
  findMany(
    params: PaginationParams,
    projectId?: string,
    shiftId?: string,
    shiftsId?: Array<string>
  ): Promise<Array<ProjectShift>>;
  save(projectShifit: ProjectShift): Promise<void>;
  findById(projectShifitId: string): Promise<ProjectShift | null>;
  delete(projectShifit: ProjectShift): Promise<void>;
}
