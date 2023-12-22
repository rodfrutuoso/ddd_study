import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectShiftRepository } from "@/domain/shifts/application/repositories/projectShift-repository";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

export class InMemoryProjectShiftRepository implements ProjectShiftRepository {
  public items: ProjectShift[] = [];
  async findManyByShift(shiftId: string, { page }: PaginationParams) {
    const projectShifts = this.items
      .filter((projectShift) => projectShift.shiftId.toString() === shiftId)
      .slice((page - 1) * 50, page * 50);

    return projectShifts;
  }

  async create(projectShift: ProjectShift) {
    this.items.push(projectShift);
  }
}
