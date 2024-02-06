import { GetEPIQuestionByQuestion } from "./get-epiQuestion-by-question";
import { InMemoryEpiQuestionRepository } from "test/repositories/in-memory-epiQuestion-repository";
import { makeEPIQuestion } from "test/factories/make-epiQuestion";

let inMemoryEpiQuestionRepository: InMemoryEpiQuestionRepository;
let sut: GetEPIQuestionByQuestion; // system under test

describe("Get EPIQuestion By EPIQuestion", () => {
  beforeEach(() => {
    inMemoryEpiQuestionRepository = new InMemoryEpiQuestionRepository();
    sut = new GetEPIQuestionByQuestion(inMemoryEpiQuestionRepository);
  });

  it("should be able to get a list of epiQuestions of a date", async () => {
    const newEPIQuestion1 = makeEPIQuestion({
      question: "Houve problema com a camera?",
    });
    const newEPIQuestion2 = makeEPIQuestion({
      question: "Houve problema com a camera?",
    });
    const newEPIQuestion3 = makeEPIQuestion({
      question: "A gravação funcionu corretamente?",
    });

    await inMemoryEpiQuestionRepository.create(newEPIQuestion1);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion2);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion3);

    const result = await sut.execute({
      page: 1,
      question: "Houve problema com a camera",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.epiquestion).toHaveLength(2);
    expect(result.value?.epiquestion).not.toContain(newEPIQuestion3);
  });

  it("should be able to get a empty list of epi questions when there is no epi questions actives of the informed date", async () => {
    const newEPIQuestion1 = makeEPIQuestion({
      question: "Houve problema com a camera?",
    });
    const newEPIQuestion2 = makeEPIQuestion({
      question: "Houve problema com a camera?",
    });
    const newEPIQuestion3 = makeEPIQuestion({
      question: "A gravação funcionu corretamente?",
    });

    await inMemoryEpiQuestionRepository.create(newEPIQuestion1);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion2);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion3);

    const result = await sut.execute({
      page: 1,
      question: "Pergunta de teste",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.epiquestion).toHaveLength(0);
  });

  it("should be able paginate a list of epiquestions of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryEpiQuestionRepository.create(
        makeEPIQuestion({
          question: "Houve problema com a camera?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      question: "Houve problema com a camera?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.epiquestion).toHaveLength(7);
  });
});
