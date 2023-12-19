import { Shift } from "@/domain/shifts/enterprise/entities/shift";

export interface ShitRepository {
  create(shift: Shift): Promise<void>;
}
