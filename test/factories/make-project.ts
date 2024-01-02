import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Project,
  ProjectProps,
} from "@/domain/shifts/enterprise/entities/project";
import { faker } from "@faker-js/faker";

export function makeProject(
  override: Partial<ProjectProps> = {},
  id?: UniqueEntityId
) {
  const project = Project.create(
    {
      projectCode: faker.commerce.product(),
      description: faker.commerce.productName(),
      utd: faker.location.country(),
      city: faker.location.city(),
      group: faker.date.month(),
      ...override,
    },
    id
  );

  return project;
}
