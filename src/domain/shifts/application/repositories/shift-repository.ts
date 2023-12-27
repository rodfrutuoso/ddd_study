import { PaginationParams } from "@/core/repositories/pagination-params";
import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export interface ShiftRepository {
  findById(shiftId: string): Promise<Shift | null>;
  findManyBetweenDates(
    startDate: Date,
    endDate: Date,
    params: PaginationParams,
    teamId?: string,
    teamsId?: Array<string>,
  ): Promise<Array<Shift>>;
  save(shift: Shift): Promise<void>;
  create(shift: Shift): Promise<void>;
  delete(shift: Shift): Promise<void>;
}
