/* eslint-disable @typescript-eslint/no-empty-function */
import { CreateSmcQuestion } from "./create-smcQuestion";
import { InMemorySmcQuestionRepository } from "test/repositories/in-memory-smcQuestion-repository";

let inMemorySmcQuestionRepository: InMemorySmcQuestionRepository;
let sut: CreateSmcQuestion; // system under test

describe("Register a SmcQuestion-Shift", () => {
  beforeEach(() => {
    inMemorySmcQuestionRepository = new InMemorySmcQuestionRepository();
    sut = new CreateSmcQuestion(inMemorySmcQuestionRepository);
  });

  it("should create a SMC Question", async () => {
    const { smcQuestion } = await sut.execute({
      question: "A câmera está funcionando corretamente?",
    });

    expect(smcQuestion.id).toBeTruthy();
    expect(smcQuestion.question).toEqual(
      "A câmera está funcionando corretamente?"
    );
  });
});
