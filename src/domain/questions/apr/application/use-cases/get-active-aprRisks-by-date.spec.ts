import { GetAprRiskByDate } from "./get-active-aprRisks-by-date";
import { InMemoryAprRiskRepository } from "test/repositories/in-memory-aprRisk-repository";
import { makeAprRisk } from "test/factories/make-aprRisk";

let inMemoryAprRiskRepository: InMemoryAprRiskRepository;
let sut: GetAprRiskByDate; // system under test

describe("Get AprRisk By AprRisk", () => {
  beforeEach(() => {
    inMemoryAprRiskRepository = new InMemoryAprRiskRepository();
    sut = new GetAprRiskByDate(inMemoryAprRiskRepository);
  });

  it("should be able to get a list of apr risks of a date", async () => {
    const newAprRisk1 = makeAprRisk({
      startDate: new Date("2023-12-11"),
    });
    const newAprRisk2 = makeAprRisk({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newAprRisk3 = makeAprRisk({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryAprRiskRepository.create(newAprRisk1);
    await inMemoryAprRiskRepository.create(newAprRisk2);
    await inMemoryAprRiskRepository.create(newAprRisk3);

    const result = await sut.execute({
      page: 1,
      date: new Date("2023-12-15"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprrisk).toHaveLength(2);
    expect(result.value?.aprrisk).not.toContain(newAprRisk3);
  });

  it("should be able to get a empty list of apr risks when there is no apr risk actives of the informed date", async () => {
    const newAprRisk1 = makeAprRisk({
      startDate: new Date("2023-12-11"),
    });
    const newAprRisk2 = makeAprRisk({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newAprRisk3 = makeAprRisk({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryAprRiskRepository.create(newAprRisk1);
    await inMemoryAprRiskRepository.create(newAprRisk2);
    await inMemoryAprRiskRepository.create(newAprRisk3);

    const result = await sut.execute({
      page: 1,
      date: new Date("2023-12-05"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprrisk).toHaveLength(0);
  });

  it("should be able paginate a list of apr risks of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryAprRiskRepository.create(
        makeAprRisk({
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
    expect(result.value?.aprrisk).toHaveLength(7);
  });
});
