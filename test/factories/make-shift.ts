import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Shift, ShiftProps } from "@/domain/shifts/enterprise/entities/shift";
import { faker } from "@faker-js/faker";

export function makeShift(
  override: Partial<ShiftProps> = {},
  id?: UniqueEntityId,
) {
  const shift = Shift.create(
    {
      teamId: new UniqueEntityId(faker.string.uuid()),
      date: faker.date.anytime(),
      odometer_end: faker.number.int({ min: 100, max: 1200 }),
      odometer_start: faker.number.int({ min: 1200, max: 1500 }),
      shift_start: faker.number.float({ min: 0, max: 0.5 }).toString(),
      shift_end: faker.number.float({ min: 0.5, max: 1 }).toString(),
      vehicle_id: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  );

  return shift;
}
