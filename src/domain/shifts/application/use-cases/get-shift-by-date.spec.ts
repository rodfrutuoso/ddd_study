/* eslint-disable @typescript-eslint/no-empty-function */
import { GetShiftByDate } from "./get-shift-by-date";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: GetShiftByDate; // system under test

describe("Get Shift By Date", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new GetShiftByDate(inMemoryShitRepository);
  });

  it("should be albe to get a list of shifts between two dates ", async () => {
    const newShift1 = makeShift({ date: new Date("2023-11-10") });
    const newShift2 = makeShift({ date: new Date("2023-11-12") });
    const newShift3 = makeShift({ date: new Date("2023-11-15") });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const result = await sut.execute({
      startDate: new Date("2023-11-12"),
      endDate: new Date("2023-11-15"),
    });

    expect(result).toEqual("abc-123-xyz");
  });
});
