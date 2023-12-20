import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Launch,
  LaunchProps,
} from "@/domain/shifts/enterprise/entities/launch";
import { Value } from "@/domain/shifts/enterprise/entities/value-objects/value";
import { faker } from "@faker-js/faker";

export function makeLaunch(
  override: Partial<LaunchProps> = {},
  id?: UniqueEntityId,
) {
  const launch = Launch.create(
    {
      value: new Value(faker.number.float()),
      serviceId: new UniqueEntityId(faker.string.uuid()),
      projectShiftId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  );

  return launch;
}
