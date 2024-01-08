import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  VehicleResponse,
  VehicleResponseProps,
} from "@/domain/questions/vehicle/enterprise/entities/vehicleResponse";
import { faker } from "@faker-js/faker";

export function makeVEHICLEResponse(
  override: Partial<VehicleResponseProps> = {},
  id?: UniqueEntityId
) {
  const vehicleresponse = VehicleResponse.create(
    {
      questionId: new UniqueEntityId(faker.string.uuid()),
      shiftId: new UniqueEntityId(faker.string.uuid()),
      vehicleId: faker.datatype.boolean()
        ? undefined
        : new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id
  );

  return vehicleresponse;
}
