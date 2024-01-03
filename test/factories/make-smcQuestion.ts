import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  SMCQuestion,
  SMCQuestionProps,
} from "@/domain/questions/enterprise/entities/smcQuestion";
import { faker } from "@faker-js/faker";

export function makeSMCQuestion(
  override: Partial<SMCQuestionProps> = {},
  id?: UniqueEntityId
) {
  const smcquestion = SMCQuestion.create(
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

  return smcquestion;
}
