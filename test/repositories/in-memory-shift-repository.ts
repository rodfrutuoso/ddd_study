import { ShiftRepository } from "@/domain/shifts/application/repositories/shift-repository";
import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export class InMemoryShiftRepository implements ShiftRepository {
  async findByTeam(teamId: string) {
    const shift = this.items.find((item) => item.teamId.toString() === teamId);

    if (!shift) return null;

    return shift;
  }

  public items: Shift[] = [];

  async create(shift: Shift) {
    this.items.push(shift);
  }
}
