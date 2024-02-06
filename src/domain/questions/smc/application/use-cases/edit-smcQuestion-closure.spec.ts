/* eslint-disable @typescript-eslint/no-empty-function */
import { EditSmcQuestion } from "./edit-smcQuestion-closure";
import { InMemorySmcQuestionRepository } from "test/repositories/in-memory-smcQuestion-repository";
import { makeSMCQuestion } from "test/factories/make-smcQuestion";

let inMemorySmcQuestionRepository: InMemorySmcQuestionRepository;
let sut: EditSmcQuestion; // system under test

describe("Edit SMC Question By Id", () => {
  beforeEach(() => {
    inMemorySmcQuestionRepository = new InMemorySmcQuestionRepository();
    sut = new EditSmcQuestion(inMemorySmcQuestionRepository);
  });

  it("should be albe to edit a smc question by its id", async () => {
    const newSMCQuestion = await makeSMCQuestion({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemorySmcQuestionRepository.create(newSMCQuestion);

    const result = await sut.execute({
      questionId: newSMCQuestion.id.toString(),
      programmerType: "PROGRAMAÇÃO",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemorySmcQuestionRepository.items[0]).toMatchObject({
      id: newSMCQuestion.id,
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });
    expect(await inMemorySmcQuestionRepository.items[0].endDate).toBeInstanceOf(
      Date
    );
  });

  it("should not be albe to edit a smc question by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newSMCQuestion = await makeSMCQuestion({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemorySmcQuestionRepository.create(newSMCQuestion);

    const result = await sut.execute({
      questionId: newSMCQuestion.id.toString(),
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
