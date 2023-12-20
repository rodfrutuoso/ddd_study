/* eslint-disable @typescript-eslint/no-empty-function */
import { EditShift } from "./edit-shift";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: EditShift; // system under test

describe("Edit Shift By Id", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new EditShift(inMemoryShitRepository);
  });

  it("should be albe to edit a shift by its id", async () => {
    const newShift = await makeShift(
      { vehicle_id: new UniqueEntityId("vehicle-id-antes") },
      new UniqueEntityId("abc-123-xyz"),
    );

    await inMemoryShitRepository.create(newShift);

    await sut.execute({
      shiftId: newShift.id.toString(),
      programmerType: "ADM",
      vehicle_id: "vehicle-id-editado",
      odometer_start: 1200,
      odometer_end: 1400,
    });

    expect(await inMemoryShitRepository.items[0]).toMatchObject({
      vehicle_id: new UniqueEntityId("vehicle-id-editado"),
      odometer_start: 1200,
      odometer_end: 1400,
    });
  });

  it("should not be albe to edit a shift by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newShift = await makeShift(
      { vehicle_id: new UniqueEntityId("vehicle-id-antes") },
      new UniqueEntityId("abc-123-xyz"),
    );

    await inMemoryShitRepository.create(newShift);

    expect(async () => {
      return await sut.execute({
        shiftId: newShift.id.toString(),
        programmerType: "CAMPO",
        vehicle_id: "vehicle-id-editado",
        odometer_start: 1200,
        odometer_end: 1400,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
