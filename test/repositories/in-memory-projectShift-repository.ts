import { PaginationParams } from "@/core/repositories/pagination-params";
import { ProjectShiftRepository } from "@/domain/production/projectShift/application/repositories/projectShift-repository";
import { ProjectShift } from "@/domain/production/projectShift/enterprise/entities/projectShift";

export class InMemoryProjectShiftRepository implements ProjectShiftRepository {
  public items: ProjectShift[] = [];
  async findMany(
    { page }: PaginationParams,
    projectId?: string,
    shiftId?: string,
    shiftsId?: Array<string>
  ): Promise<ProjectShift[]> {
    const projectshifts = this.items
      .filter(
        (projectshift) =>
          !projectId || projectshift.projectId.toString() === projectId
      )
      .filter(
        (projectshift) =>
          !shiftId || projectshift.shiftId.toString() === shiftId
      )
      .filter(
        (projectshift) =>
          shiftsId === undefined ||
          shiftsId.includes(projectshift.shiftId.toString())
      )
      .slice((page - 1) * 50, page * 50);

    return projectshifts;
  }

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
