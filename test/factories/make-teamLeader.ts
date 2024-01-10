import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  TeamLeader,
  TeamLeaderProps,
} from "@/domain/users/enterprise/entities/teamLeader";
import { faker } from "@faker-js/faker";

export function makeTeamLeader(
  override: Partial<TeamLeaderProps> = {},
  id?: UniqueEntityId
) {
  const teamleader = TeamLeader.create(
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

  return teamleader;
}

const types = ["ADM", "TEAMLEADER", "teamLeader", "programmer", "field"];
