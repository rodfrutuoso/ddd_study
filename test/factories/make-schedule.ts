import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Schedule,
  ScheduleProps,
} from "@/domain/production/schedule/enterprise/entities/schedule";
import { faker } from "@faker-js/faker";

export function makeSchedule(
  override: Partial<ScheduleProps> = {},
  id?: UniqueEntityId
) {
  const schedule = Schedule.create(
    {
      projectId: new UniqueEntityId(faker.string.uuid()),
      teamId: new UniqueEntityId(faker.string.uuid()),
      date: faker.date.soon(),
      ...override,
    },
    id
  );

  return schedule;
}
