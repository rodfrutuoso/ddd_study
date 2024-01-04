import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  EPIQuestion,
  EPIQuestionProps,
} from "@/domain/questions/enterprise/entities/epiQuestion";
import { faker } from "@faker-js/faker";

export function makeEPIQuestion(
  override: Partial<EPIQuestionProps> = {},
  id?: UniqueEntityId
) {
  const epiquestion = EPIQuestion.create(
    {
      question: faker.lorem.sentence(),
      startDate: faker.date.between({
        from: new Date("2023-01-01"),
        to: new Date("2023-06-01"),
      }),
      endDate: undefined,
      ...override,
    },
    id
  );

  return epiquestion;
}
