import { GetSMCQuestionByDate } from "./get-active-smcQuestions-by-date";
import { InMemorySmcQuestionRepository } from "test/repositories/in-memory-smcQuestion-repository";
import { makeSMCQuestion } from "test/factories/make-smcQuestion";

let inMemorySmcQuestionRepository: InMemorySmcQuestionRepository;
let sut: GetSMCQuestionByDate; // system under test

describe("Get SMCQuestion By SMCQuestion", () => {
  beforeEach(() => {
    inMemorySmcQuestionRepository = new InMemorySmcQuestionRepository();
    sut = new GetSMCQuestionByDate(inMemorySmcQuestionRepository);
  });

  it("should be able to get a list of smcQuestions of a date", async () => {
    const newSMCQuestion1 = makeSMCQuestion({
      startDate: new Date("2023-12-11"),
    });
    const newSMCQuestion2 = makeSMCQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newSMCQuestion3 = makeSMCQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemorySmcQuestionRepository.create(newSMCQuestion1);
    await inMemorySmcQuestionRepository.create(newSMCQuestion2);
    await inMemorySmcQuestionRepository.create(newSMCQuestion3);

    const result = await sut.execute({
      page: 1,
      date: new Date("2023-12-15"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.smcquestion).toHaveLength(2);
    expect(result.value?.smcquestion).not.toContain(newSMCQuestion3);
  });

  it("should be able to get a empty list of smc questions when there is no smc questions actives of the informed date", async () => {
    const newSMCQuestion1 = makeSMCQuestion({
      startDate: new Date("2023-12-11"),
    });
    const newSMCQuestion2 = makeSMCQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newSMCQuestion3 = makeSMCQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemorySmcQuestionRepository.create(newSMCQuestion1);
    await inMemorySmcQuestionRepository.create(newSMCQuestion2);
    await inMemorySmcQuestionRepository.create(newSMCQuestion3);

    const result = await sut.execute({
      page: 1,
      date: new Date("2023-12-05"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.smcquestion).toHaveLength(0);
  });

  it("should be able paginate a list of smcquestions of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemorySmcQuestionRepository.create(
        makeSMCQuestion({
          startDate: new Date("2023-12-11"),
          endDate: new Date("2023-12-17"),
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      date: new Date("2023-12-15"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.smcquestion).toHaveLength(7);
  });
});
