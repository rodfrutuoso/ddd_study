import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Coordinator,
  CoordinatorProps,
} from "@/domain/users/enterprise/entities/coordinator";
import { faker } from "@faker-js/faker";

export function makeCoordinator(
  override: Partial<CoordinatorProps> = {},
  id?: UniqueEntityId
) {
  const coordinator = Coordinator.create(
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
      ...override,
    },
    id
  );

  return coordinator;
}

const types = ["ADM", "COORDINATOR", "teamLeader", "programmer", "field"];
