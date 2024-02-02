/* eslint-disable @typescript-eslint/no-empty-function */
import { EditProjectShift } from "./edit-projectShift";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";

let inMemoryProjectShiftRepository: InMemoryProjectShiftRepository;
let sut: EditProjectShift; // system under test

describe("Edit ProjectShift By Id", () => {
  beforeEach(() => {
    inMemoryProjectShiftRepository = new InMemoryProjectShiftRepository();
    sut = new EditProjectShift(inMemoryProjectShiftRepository);
  });

  it("should be albe to edit a projectshift by its id", async () => {
    const newProjectShift = await makeProjectShift({
      projectStage: "LANÇAMENTO",
    });

    await inMemoryProjectShiftRepository.create(newProjectShift);

    await sut.execute({
      projectShiftId: newProjectShift.id.toString(),
      projectStage: "IMPLANTAÇÃO",
      fieldReturn: "EXECUTADO",
      outOfSchedule: false,
      programmerType: "ADM",
    });

    expect(await inMemoryProjectShiftRepository.items[0]).toMatchObject({
      projectStage: "IMPLANTAÇÃO",
      fieldReturn: "EXECUTADO",
      outOfSchedule: false,
    });
  });

  it("should not be albe to edit a projectshift by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newProjectShift = await makeProjectShift({
      projectStage: "LANÇAMENTO",
    });

    await inMemoryProjectShiftRepository.create(newProjectShift);

    const result = await sut.execute({
      projectShiftId: newProjectShift.id.toString(),
      projectStage: "IMPLANTAÇÃO",
      fieldReturn: "EXECUTADO",
      outOfSchedule: false,
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
