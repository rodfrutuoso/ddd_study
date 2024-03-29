import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { UserNameId } from "@/core/entities/userNameId";
import {
  Team,
  TeamProps,
} from "@/domain/production/team/enterprise/entities/team";
import { faker } from "@faker-js/faker";

export function makeTeam(
  override: Partial<TeamProps> = {},
  id?: UniqueEntityId
) {
  const team = Team.create(
    {
      name: faker.company.name(),
      leaderId: new UserNameId(
        faker.person.fullName(),
        new UniqueEntityId(faker.string.uuid())
      ),
      supervisorId: faker.datatype.boolean()
        ? new UserNameId(undefined, undefined)
        : new UserNameId(
            faker.person.fullName(),
            new UniqueEntityId(faker.string.uuid())
          ),
      coordinatorId: faker.datatype.boolean()
        ? new UserNameId(undefined, undefined)
        : new UserNameId(
            faker.person.fullName(),
            new UniqueEntityId(faker.string.uuid())
          ),
      type: faker.vehicle.type(),
      contract: faker.number.float({ min: 0.5, max: 1 }).toString(),
      deactivation_date: faker.datatype.boolean()
        ? undefined
        : faker.date.recent(),
      ...override,
    },
    id
  );

  return team;
}
