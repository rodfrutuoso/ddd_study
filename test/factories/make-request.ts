import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Request,
  RequestProps,
} from "@/domain/users/enterprise/entities/request";
import { faker } from "@faker-js/faker";

export function makeRequest(
  override: Partial<RequestProps> = {},
  id?: UniqueEntityId
) {
  const request = Request.create(
    {
      name: faker.internet.displayName(),
      cpf: faker.number.int({ min: 111111111, max: 99999999999 }),
      email: faker.datatype.boolean()
        ? undefined
        : faker.internet.email({ provider: "ecoeletrica.com.br" }),
      password: faker.internet.password(),
      type: faker.helpers.arrayElement(types),
      deactivation_date: undefined,
      created_at: faker.date.recent(),
      created_by: new UniqueEntityId(faker.string.uuid()),
      updated_at: faker.date.recent(),
      teamId: faker.datatype.boolean()
        ? undefined
        : new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id
  );

  return request;
}

const types = ["ADM", "REQUEST", "teamLeader", "programmer", "field"];
