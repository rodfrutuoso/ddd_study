/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteShift } from "./delete-shift";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: DeleteShift; // system under test

describe("Delete Shift By Id", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new DeleteShift(inMemoryShitRepository);
  });

  it("should be albe to delete a shift by its id", async () => {
    const newShift = await makeShift({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryShitRepository.create(newShift);

    await sut.execute({
      shiftId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(await inMemoryShitRepository.findById("abc-123-xyz")).toBeNull();
    expect(await inMemoryShitRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a shift by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newShift = await makeShift({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryShitRepository.create(newShift);

    const result = await sut.execute({
      shiftId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();

    expect(await inMemoryShitRepository.findById("abc-123-xyz")).toBeTruthy();
    expect(await inMemoryShitRepository.items).toHaveLength(1);
  });
});
