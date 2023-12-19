/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { GetShiftByTeam } from "./get-shift-by-team";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { Shift } from "../../enterprise/entities/shift";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: GetShiftByTeam; // system under test

describe("Get Shift By Team", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new GetShiftByTeam(inMemoryShitRepository);
  });

  it("should be albe to get the shift by teamId", async () => {
    const newShift = Shift.create({
      teamId: new UniqueEntityId("abc-123-xyz"),
      date: new Date("2023-12-15 00:00:00"),
      odometer_end: 1200,
      odometer_start: 1100,
      shift_end: "08:10:01",
      shift_start: "18:10:01",
      vehicle_id: new UniqueEntityId("2"),
    });

    await inMemoryShitRepository.create(newShift);

    const result = await sut.execute({
      teamId: "abc-123-xyz",
    });

    expect(result.shift.teamId.toValue()).toEqual("abc-123-xyz");
  });
});
