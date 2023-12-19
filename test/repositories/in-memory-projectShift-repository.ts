import { ProjectShiftRepository } from "@/domain/shifts/application/repositories/projectShift-repository";
import { ProjectShift } from "@/domain/shifts/enterprise/entities/projectShifit";

export class InMemoryProjectShitRepository implements ProjectShiftRepository {
  public items: ProjectShift[] = [];

  async create(projectShift: ProjectShift) {
    this.items.push(projectShift);
  }
}
