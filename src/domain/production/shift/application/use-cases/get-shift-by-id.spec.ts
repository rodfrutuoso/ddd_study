/* eslint-disable @typescript-eslint/no-empty-function */
import { GetShiftByTeam } from "./get-shift-by-id";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: GetShiftByTeam; // system under test

describe("Get Shift By Team", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new GetShiftByTeam(inMemoryShitRepository);
  });

  it("should be albe to get the shift by teamId", async () => {
    const newShift = makeShift({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryShitRepository.create(newShift);

    const result = await sut.execute({
      shiftId: "abc-123-xyz",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.shift.id.toString()).toEqual("abc-123-xyz");
  });
});
