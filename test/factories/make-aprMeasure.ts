import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  APRMeasure,
  APRMeasureProps,
} from "@/domain/questions/enterprise/entities/aprMeasure";
import { faker } from "@faker-js/faker";

export function makeAprMeasure(
  override: Partial<APRMeasureProps> = {},
  id?: UniqueEntityId
) {
  const aprmeasure = APRMeasure.create(
    {
      response: faker.lorem.sentence(),
      category: faker.lorem.sentence(),
      startDate: faker.date.between({
        from: new Date("2023-01-01"),
        to: new Date("2023-06-01"),
      }),
      endDate: undefined,
      ...override,
    },
    id
  );

  return aprmeasure;
}
