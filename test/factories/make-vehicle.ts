import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Vehicle,
  VehicleProps,
} from "@/domain/production/vehicle/enterprise/entities/vehicle";
import { faker } from "@faker-js/faker";

export function makeVehicle(
  override: Partial<VehicleProps> = {},
  id?: UniqueEntityId
) {
  const vehicle = Vehicle.create(
    {
      plate: faker.company.name(),
      teamId: new UniqueEntityId(faker.string.uuid()),
      type: faker.vehicle.type(),
      created_at: faker.date.recent(),
      ...override,
    },
    id
  );

  return vehicle;
}
