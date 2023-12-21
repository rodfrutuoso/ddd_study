/* eslint-disable @typescript-eslint/no-empty-function */
import { GetShiftByDate } from "./get-shift-by-date";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { faker } from "@faker-js/faker";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: GetShiftByDate; // system under test

describe("Get Shift By Date", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new GetShiftByDate(inMemoryShitRepository);
  });

  it("should be able to get a list of shifts between two dates", async () => {
    const newShift1 = makeShift({ date: new Date("2023-11-10") });
    const newShift2 = makeShift({ date: new Date("2023-11-12") });
    const newShift3 = makeShift({ date: new Date("2023-11-15") });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const result = await sut.execute({
      startDate: new Date("2023-11-12"),
      endDate: new Date("2023-11-15"),
      page: 1,
    });

    expect(result).toHaveLength(2);
    expect(result).not.toContain(newShift1);
    expect(result[0].date).toEqual(new Date("2023-11-15"));
  });

  it("should be able to get a empty list of shifts when there is no shift between the infomed dates ", async () => {
    const newShift1 = makeShift({ date: new Date("2023-11-10") });
    const newShift2 = makeShift({ date: new Date("2023-11-12") });
    const newShift3 = makeShift({ date: new Date("2023-11-15") });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const result = await sut.execute({
      startDate: new Date("2023-11-16"),
      endDate: new Date("2023-11-20"),
      page: 1,
    });

    expect(result).toHaveLength(0);
  });

  it("should be able paginate a list of shifts between two dates", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryShitRepository.create(
        makeShift({
          date: faker.date.between({ from: "2023-11-12", to: "2023-11-15" }),
        }),
      );
    }

    console.log(inMemoryShitRepository.items.length);

    const result = await sut.execute({
      startDate: new Date("2023-11-12"),
      endDate: new Date("2023-11-15"),
      page: 2,
    });

    expect(result).toHaveLength(5);
  });
});
