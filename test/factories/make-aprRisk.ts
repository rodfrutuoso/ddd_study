import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  APRRisk,
  APRRiskProps,
} from "@/domain/questions/enterprise/entities/aprRisk";
import { faker } from "@faker-js/faker";

export function makeAprRisk(
  override: Partial<APRRiskProps> = {},
  id?: UniqueEntityId
) {
  const aprrisk = APRRisk.create(
    {
      question: faker.lorem.sentence(),
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

  return aprrisk;
}
