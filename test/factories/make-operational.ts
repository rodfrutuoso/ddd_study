import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Operational,
  OperationalProps,
} from "@/domain/users/enterprise/entities/operational";
import { faker } from "@faker-js/faker";

export function makeOperational(
  override: Partial<OperationalProps> = {},
  id?: UniqueEntityId
) {
  const operational = Operational.create(
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
      teamId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id
  );

  return operational;
}

const types = ["ADM", "OPERATIONAL", "operational", "programmer", "field"];
