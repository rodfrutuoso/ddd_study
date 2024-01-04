import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  EPIResponse,
  EPIResponseProps,
} from "@/domain/questions/enterprise/entities/epiResponse";
import { faker } from "@faker-js/faker";

export function makeEPIResponse(
  override: Partial<EPIResponseProps> = {},
  id?: UniqueEntityId
) {
  const epiresponse = EPIResponse.create(
    {
      questionId: new UniqueEntityId(faker.string.uuid()),
      shiftId: new UniqueEntityId(faker.string.uuid()),
      userId: faker.datatype.boolean()
        ? undefined
        : new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id
  );

  return epiresponse;
}
