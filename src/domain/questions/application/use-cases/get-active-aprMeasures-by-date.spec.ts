import { GetAprMeasureByDate } from "./get-active-aprMeasures-by-date";
import { InMemoryAprMeasureRepository } from "test/repositories/in-memory-aprMeasure-repository";
import { makeAprMeasure } from "test/factories/make-aprMeasure";

let inMemoryAprMeasureRepository: InMemoryAprMeasureRepository;
let sut: GetAprMeasureByDate; // system under test

describe("Get AprMeasure By AprMeasure", () => {
  beforeEach(() => {
    inMemoryAprMeasureRepository = new InMemoryAprMeasureRepository();
    sut = new GetAprMeasureByDate(inMemoryAprMeasureRepository);
  });

  it("should be able to get a list of apr risks of a date", async () => {
    const newAprMeasure1 = makeAprMeasure({
      startDate: new Date("2023-12-11"),
    });
    const newAprMeasure2 = makeAprMeasure({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newAprMeasure3 = makeAprMeasure({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure1);
    await inMemoryAprMeasureRepository.create(newAprMeasure2);
    await inMemoryAprMeasureRepository.create(newAprMeasure3);

    const { aprmeasure } = await sut.execute({
      page: 1,
      date: new Date("2023-12-15"),
    });

    expect(aprmeasure).toHaveLength(2);
    expect(aprmeasure).not.toContain(newAprMeasure3);
  });

  it("should be able to get a empty list of apr risks when there is no apr risk actives of the informed date", async () => {
    const newAprMeasure1 = makeAprMeasure({
      startDate: new Date("2023-12-11"),
    });
    const newAprMeasure2 = makeAprMeasure({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newAprMeasure3 = makeAprMeasure({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure1);
    await inMemoryAprMeasureRepository.create(newAprMeasure2);
    await inMemoryAprMeasureRepository.create(newAprMeasure3);

    const { aprmeasure } = await sut.execute({
      page: 1,
      date: new Date("2023-12-05"),
    });

    expect(aprmeasure).toHaveLength(0);
  });

  it("should be able paginate a list of apr risks of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryAprMeasureRepository.create(
        makeAprMeasure({
          startDate: new Date("2023-12-11"),
          endDate: new Date("2023-12-17"),
        })
      );
    }

    const { aprmeasure } = await sut.execute({
      page: 2,
      date: new Date("2023-12-15"),
    });

    expect(aprmeasure).toHaveLength(7);
  });
});
