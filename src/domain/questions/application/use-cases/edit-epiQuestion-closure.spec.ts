/* eslint-disable @typescript-eslint/no-empty-function */
import { EditEpiQuestion } from "./edit-epiQuestion-closure";
import { InMemoryEpiQuestionRepository } from "test/repositories/in-memory-epiQuestion-repository";
import { makeEPIQuestion } from "test/factories/make-epiQuestion";

let inMemoryEpiQuestionRepository: InMemoryEpiQuestionRepository;
let sut: EditEpiQuestion; // system under test

describe("Edit EPI Question By Id", () => {
  beforeEach(() => {
    inMemoryEpiQuestionRepository = new InMemoryEpiQuestionRepository();
    sut = new EditEpiQuestion(inMemoryEpiQuestionRepository);
  });

  it("should be albe to edit a epi question by its id", async () => {
    const newEPIQuestion = await makeEPIQuestion({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryEpiQuestionRepository.create(newEPIQuestion);

    await sut.execute({
      questionId: newEPIQuestion.id.toString(),
      programmerType: "PROGRAMAÇÃO",
    });

    expect(await inMemoryEpiQuestionRepository.items[0]).toMatchObject({
      id: newEPIQuestion.id,
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });
    expect(await inMemoryEpiQuestionRepository.items[0].endDate).toBeInstanceOf(
      Date
    );
  });

  it("should not be albe to edit a epi question by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newEPIQuestion = await makeEPIQuestion({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryEpiQuestionRepository.create(newEPIQuestion);

    expect(async () => {
      return await sut.execute({
        questionId: newEPIQuestion.id.toString(),
        programmerType: "CAMPO",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
