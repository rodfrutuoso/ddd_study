import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Tst, TstProps } from "@/domain/users/enterprise/entities/tst";
import { faker } from "@faker-js/faker";

export function makeTst(override: Partial<TstProps> = {}, id?: UniqueEntityId) {
  const tst = Tst.create(
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

  return tst;
}

const types = ["ADM", "TST", "teamLeader", "programmer", "field"];
