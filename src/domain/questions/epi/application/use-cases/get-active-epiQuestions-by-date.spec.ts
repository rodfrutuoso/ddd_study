import { GetEPIQuestionByDate } from "./get-active-epiQuestions-by-date";
import { InMemoryEpiQuestionRepository } from "test/repositories/in-memory-epiQuestion-repository";
import { makeEPIQuestion } from "test/factories/make-epiQuestion";

let inMemoryEpiQuestionRepository: InMemoryEpiQuestionRepository;
let sut: GetEPIQuestionByDate; // system under test

describe("Get EPIQuestion By EPIQuestion", () => {
  beforeEach(() => {
    inMemoryEpiQuestionRepository = new InMemoryEpiQuestionRepository();
    sut = new GetEPIQuestionByDate(inMemoryEpiQuestionRepository);
  });

  it("should be able to get a list of epiQuestions of a date", async () => {
    const newEPIQuestion1 = makeEPIQuestion({
      startDate: new Date("2023-12-11"),
    });
    const newEPIQuestion2 = makeEPIQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newEPIQuestion3 = makeEPIQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryEpiQuestionRepository.create(newEPIQuestion1);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion2);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion3);

    const { epiquestion } = await sut.execute({
      page: 1,
      date: new Date("2023-12-15"),
    });

    expect(epiquestion).toHaveLength(2);
    expect(epiquestion).not.toContain(newEPIQuestion3);
  });

  it("should be able to get a empty list of epi questions when there is no epi questions actives of the informed date", async () => {
    const newEPIQuestion1 = makeEPIQuestion({
      startDate: new Date("2023-12-11"),
    });
    const newEPIQuestion2 = makeEPIQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newEPIQuestion3 = makeEPIQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryEpiQuestionRepository.create(newEPIQuestion1);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion2);
    await inMemoryEpiQuestionRepository.create(newEPIQuestion3);

    const { epiquestion } = await sut.execute({
      page: 1,
      date: new Date("2023-12-05"),
    });

    expect(epiquestion).toHaveLength(0);
  });

  it("should be able paginate a list of epiquestions of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryEpiQuestionRepository.create(
        makeEPIQuestion({
          startDate: new Date("2023-12-11"),
          endDate: new Date("2023-12-17"),
        })
      );
    }

    const { epiquestion } = await sut.execute({
      page: 2,
      date: new Date("2023-12-15"),
    });

    expect(epiquestion).toHaveLength(7);
  });
});
