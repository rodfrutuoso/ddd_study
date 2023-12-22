import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

export interface ProjectShiftRepository {
  create(projectShift: ProjectShift): Promise<void>;
  findManyByShift(
    shiftId: string,
    params: PaginationParams,
  ): Promise<Array<ProjectShift>>;
  findManyByProject(
    projectId: string,
    params: PaginationParams,
  ): Promise<Array<ProjectShift>>;
  save(projectShifit: ProjectShift): Promise<void>;
  findById(projectShifitId: string): Promise<ProjectShift | null>;
  delete(projectShifit: ProjectShift): Promise<void>;
}
