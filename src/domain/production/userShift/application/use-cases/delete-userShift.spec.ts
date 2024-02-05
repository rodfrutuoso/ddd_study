/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteUserShift } from "./delete-userShift";
import { InMemoryUserShiftRepository } from "test/repositories/in-memory-userShift-repository";
import { makeUserShift } from "test/factories/make-userShift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryUserShiftRepository: InMemoryUserShiftRepository;
let sut: DeleteUserShift; // system under test

describe("Delete UserShift By Id", () => {
  beforeEach(() => {
    inMemoryUserShiftRepository = new InMemoryUserShiftRepository();
    sut = new DeleteUserShift(inMemoryUserShiftRepository);
  });

  it("should be albe to delete a usershift by its id", async () => {
    const newUserShift = await makeUserShift(
      {},
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryUserShiftRepository.create(newUserShift);

    const result = await sut.execute({
      userShiftId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(result.isRight()).toBeTruthy();
    expect(
      await inMemoryUserShiftRepository.findById("abc-123-xyz")
    ).toBeNull();
    expect(await inMemoryUserShiftRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a usershift by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newUserShift = await makeUserShift(
      {},
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryUserShiftRepository.create(newUserShift);

    const result = await sut.execute({
      userShiftId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(
      await inMemoryUserShiftRepository.findById("abc-123-xyz")
    ).toBeTruthy();
    expect(await inMemoryUserShiftRepository.items).toHaveLength(1);
  });
});
