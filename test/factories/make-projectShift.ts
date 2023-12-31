import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  ProjectShift,
  ProjectShiftProps,
} from "@/domain/production/projectShift/enterprise/entities/projectShift";
import { faker } from "@faker-js/faker";

export function makeProjectShift(
  override: Partial<ProjectShiftProps> = {},
  id?: UniqueEntityId
) {
  const projectshift = ProjectShift.create(
    {
      shiftId: new UniqueEntityId(faker.string.uuid()),
      projectId: new UniqueEntityId(faker.string.uuid()),
      projectStage: faker.lorem.sentence(),
      fieldReturn: faker.lorem.sentence(),
      outOfSchedule: faker.datatype.boolean(),
      ...override,
    },
    id
  );

  return projectshift;
}
