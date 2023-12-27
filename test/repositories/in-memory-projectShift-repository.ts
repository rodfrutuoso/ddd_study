import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectShiftRepository } from "@/domain/shifts/application/repositories/projectShift-repository";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

export class InMemoryProjectShiftRepository implements ProjectShiftRepository {
  public items: ProjectShift[] = [];
  async save(projectShifit: ProjectShift): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === projectShifit.id
    );

    this.items[itemIndex] = projectShifit;
  }

  async findById(projectShifitId: string): Promise<ProjectShift | null> {
    const projectShift = this.items.find(
      (item) => item.id.toString() === projectShifitId
    );

    if (!projectShift) return null;

    return projectShift;
  }

  async findManyByProject(
    projectId: string,
    { page }: PaginationParams
  ): Promise<ProjectShift[]> {
    const projectShifts = this.items
      .filter((projectShift) => projectShift.projectId.toString() === projectId)
      .slice((page - 1) * 50, page * 50);

    return projectShifts;
  }

  async findManyByShift(shiftId: string, { page }: PaginationParams) {
    const projectShifts = this.items
      .filter((projectShift) => projectShift.shiftId.toString() === shiftId)
      .slice((page - 1) * 50, page * 50);

    return projectShifts;
  }

  async create(projectShift: ProjectShift) {
    this.items.push(projectShift);
  }

  async delete(projectShifit: ProjectShift) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === projectShifit.id
    );

    this.items.splice(itemIndex, 1);
  }
}
