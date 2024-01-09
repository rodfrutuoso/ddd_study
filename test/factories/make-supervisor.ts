import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Supervisor,
  SupervisorProps,
} from "@/domain/users/enterprise/entities/supervisor";
import { faker } from "@faker-js/faker";

export function makeSupervisor(
  override: Partial<SupervisorProps> = {},
  id?: UniqueEntityId
) {
  const supervisor = Supervisor.create(
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

  return supervisor;
}

const types = ["ADM", "SUPERVISOR", "teamLeader", "programmer", "field"];
