import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export interface ShiftRepository {
  findById(shiftId: string): Promise<Shift | null>;
  findByTeam(teamId: string): Promise<Shift | null>;
  create(shift: Shift): Promise<void>;
  delete(shift: Shift): Promise<void>;
}
