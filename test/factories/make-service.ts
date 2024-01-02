import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Service,
  ServiceProps,
} from "@/domain/production/service/enterprise/entities/service";
import { faker } from "@faker-js/faker";

export function makeService(
  override: Partial<ServiceProps> = {},
  id?: UniqueEntityId
) {
  const service = Service.create(
    {
      code: faker.commerce.product(),
      description: faker.commerce.productName(),
      ...override,
    },
    id
  );

  return service;
}
