import { ShiftRepository } from "@/domain/shifts/application/repositories/shift-repository";
import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export class InMemoryShiftRepository implements ShiftRepository {
  public items: Shift[] = [];
  async findById(shiftId: string) {
    const shift = this.items.find((item) => item.id.toString() === shiftId);

    if (!shift) return null;

    return shift;
  }

  async findByTeam(teamId: string) {
    const shift = this.items.find((item) => item.teamId.toString() === teamId);

    if (!shift) return null;

    return shift;
  }

  async findBetweenDates(startDate: Date, endDate: Date) {
    const shiftsBetween = this.items.filter(
      (shift) => shift.date >= startDate && shift.date >= endDate,
    );

    if (!shiftsBetween) return undefined;

    return shiftsBetween;
  }

  async save(shift: Shift) {
    const itemIndex = this.items.findIndex((item) => item.id === shift.id);

    this.items[itemIndex] = shift;
  }

  async create(shift: Shift) {
    this.items.push(shift);
  }

  async delete(shift: Shift) {
    const itemIndex = this.items.findIndex((item) => item.id === shift.id);

    this.items.splice(itemIndex, 1);
  }
}
