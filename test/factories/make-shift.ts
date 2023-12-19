import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Shift, ShiftProps } from "@/domain/shifts/enterprise/entities/shift";

export function makeShift(override: Partial<ShiftProps> = {}) {
  const shift = Shift.create({
    teamId: new UniqueEntityId("1"),
    date: new Date("2023-12-15 00:00:00"),
    odometer_end: 1200,
    odometer_start: 1100,
    shift_start: "08:10:01",
    shift_end: "18:10:01",
    vehicle_id: new UniqueEntityId("2"),
    ...override,
  });

  return shift;
}
