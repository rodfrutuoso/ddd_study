/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteProjectShift } from "./delete-projectShift";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryProjectShiftRepository: InMemoryProjectShiftRepository;
let sut: DeleteProjectShift; // system under test

describe("Delete ProjectShift By Id", () => {
  beforeEach(() => {
    inMemoryProjectShiftRepository = new InMemoryProjectShiftRepository();
    sut = new DeleteProjectShift(inMemoryProjectShiftRepository);
  });

  it("should be albe to delete a projectshift by its id", async () => {
    const newProjectShift = await makeProjectShift(
      {},
      new UniqueEntityId("abc-123-xyz"),
    );

    await inMemoryProjectShiftRepository.create(newProjectShift);

    await sut.execute({
      projectShiftId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(
      await inMemoryProjectShiftRepository.findById("abc-123-xyz"),
    ).toBeNull();
    expect(await inMemoryProjectShiftRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a projectshift by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newProjectShift = await makeProjectShift(
      {},
      new UniqueEntityId("abc-123-xyz"),
    );

    await inMemoryProjectShiftRepository.create(newProjectShift);

    expect(async () => {
      return await sut.execute({
        projectShiftId: "abc-123-xyz",
        programmerType: "CAMPO",
      });
    }).rejects.toBeInstanceOf(Error);

    expect(
      await inMemoryProjectShiftRepository.findById("abc-123-xyz"),
    ).toBeTruthy();
    expect(await inMemoryProjectShiftRepository.items).toHaveLength(1);
  });
});
