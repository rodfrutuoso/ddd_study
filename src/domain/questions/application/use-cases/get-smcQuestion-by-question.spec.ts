import { GetSMCQuestionByQuestion } from "./get-smcQuestion-by-question";
import { InMemorySmcQuestionRepository } from "test/repositories/in-memory-smcQuestion-repository";
import { makeSMCQuestion } from "test/factories/make-smcQuestion";

let inMemorySmcQuestionRepository: InMemorySmcQuestionRepository;
let sut: GetSMCQuestionByQuestion; // system under test

describe("Get SMCQuestion By SMCQuestion", () => {
  beforeEach(() => {
    inMemorySmcQuestionRepository = new InMemorySmcQuestionRepository();
    sut = new GetSMCQuestionByQuestion(inMemorySmcQuestionRepository);
  });

  it("should be able to get a list of smcQuestions of a date", async () => {
    const newSMCQuestion1 = makeSMCQuestion({
      question: "Houve problema com a camera?",
    });
    const newSMCQuestion2 = makeSMCQuestion({
      question: "Houve problema com a camera?",
    });
    const newSMCQuestion3 = makeSMCQuestion({
      question: "A gravação funcionu corretamente?",
    });

    await inMemorySmcQuestionRepository.create(newSMCQuestion1);
    await inMemorySmcQuestionRepository.create(newSMCQuestion2);
    await inMemorySmcQuestionRepository.create(newSMCQuestion3);

    const { smcquestion } = await sut.execute({
      page: 1,
      question: "Houve problema com a camera",
    });

    expect(smcquestion).toHaveLength(2);
    expect(smcquestion).not.toContain(newSMCQuestion3);
  });

  it("should be able to get a empty list of smc questions when there is no smc questions actives of the informed date", async () => {
    const newSMCQuestion1 = makeSMCQuestion({
      question: "Houve problema com a camera?",
    });
    const newSMCQuestion2 = makeSMCQuestion({
      question: "Houve problema com a camera?",
    });
    const newSMCQuestion3 = makeSMCQuestion({
      question: "A gravação funcionu corretamente?",
    });

    await inMemorySmcQuestionRepository.create(newSMCQuestion1);
    await inMemorySmcQuestionRepository.create(newSMCQuestion2);
    await inMemorySmcQuestionRepository.create(newSMCQuestion3);

    const { smcquestion } = await sut.execute({
      page: 1,
      question: "Pergunta de teste",
    });

    expect(smcquestion).toHaveLength(0);
  });

  it("should be able paginate a list of smcquestions of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemorySmcQuestionRepository.create(
        makeSMCQuestion({
          question: "Houve problema com a camera?",
        })
      );
    }

    const { smcquestion } = await sut.execute({
      page: 2,
      question: "Houve problema com a camera?",
    });

    expect(smcquestion).toHaveLength(7);
  });
});
