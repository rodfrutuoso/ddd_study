import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export interface ShiftRepository {
  findByTeam(teamId: string): Promise<Shift | null>;
  create(shift: Shift): Promise<void>;
}
