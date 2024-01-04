import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  SMCResponse,
  SMCResponseProps,
} from "@/domain/questions/enterprise/entities/smcResponse";
import { faker } from "@faker-js/faker";

export function makeSMCResponse(
  override: Partial<SMCResponseProps> = {},
  id?: UniqueEntityId
) {
  const smcresponse = SMCResponse.create(
    {
      questionId: new UniqueEntityId(faker.string.uuid()),
      shiftId: new UniqueEntityId(faker.string.uuid()),
      cameraCode: faker.datatype.boolean() ? undefined : faker.lorem.word(),
      flaw: faker.datatype.boolean() ? undefined : faker.lorem.word(),
      ...override,
    },
    id
  );

  return smcresponse;
}
