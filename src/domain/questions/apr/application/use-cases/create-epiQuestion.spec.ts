/* eslint-disable @typescript-eslint/no-empty-function */
import { CreateEpiQuestion } from "./create-epiQuestion";
import { InMemoryEpiQuestionRepository } from "test/repositories/in-memory-epiQuestion-repository";

let inMemoryEpiQuestionRepository: InMemoryEpiQuestionRepository;
let sut: CreateEpiQuestion; // system under test

describe("Register a EpiQuestion-Shift", () => {
  beforeEach(() => {
    inMemoryEpiQuestionRepository = new InMemoryEpiQuestionRepository();
    sut = new CreateEpiQuestion(inMemoryEpiQuestionRepository);
  });

  it("should create a EPI Question", async () => {
    const result = await sut.execute({
      question: "A câmera está funcionando corretamente?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.epiQuestion.id).toBeTruthy();
    expect(result.value?.epiQuestion.question).toEqual(
      "A câmera está funcionando corretamente?"
    );
  });
});
