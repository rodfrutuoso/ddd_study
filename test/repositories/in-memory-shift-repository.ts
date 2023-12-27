import { PaginationParams } from "@/core/repositories/pagination-params";
import { ShiftRepository } from "@/domain/shifts/application/repositories/shift-repository";
import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export class InMemoryShiftRepository implements ShiftRepository {
  public items: Shift[] = [];
  async findById(shiftId: string) {
    const shift = this.items.find((item) => item.id.toString() === shiftId);

    if (!shift) return null;

    return shift;
  }

  async findManyBetweenDates(
    startDate: Date,
    endDate: Date,
    { page }: PaginationParams,
    teamId?: string,
    teamsId?: Array<string>
  ) {
    const shiftsBetween = this.items
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .filter((shift) => shift.date >= startDate && shift.date <= endDate)
      .filter((shift) => !teamId || shift.teamId.toString() === teamId)
      .filter(
        (shift) =>
          teamsId === undefined || teamsId.includes(shift.teamId.toString())
      )
      .slice((page - 1) * 50, page * 50);

    if (teamsId !== undefined && this.items.length > 3) {
      console.log(shiftsBetween);
      console.log(shiftsBetween.length);
    }

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
