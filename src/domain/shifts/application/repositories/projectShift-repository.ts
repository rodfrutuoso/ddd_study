import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

export interface ProjectShiftRepository {
  create(projectShift: ProjectShift): Promise<void>;
  findManyByShift(
    shiftId: string,
    params: PaginationParams,
  ): Promise<Array<ProjectShift>>;
}
