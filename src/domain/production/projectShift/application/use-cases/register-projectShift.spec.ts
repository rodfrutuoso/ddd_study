/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterProjectShift } from "./register-projectShift";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";

let inMemoryProjectShitRepository: InMemoryProjectShiftRepository;
let sut: RegisterProjectShift; // system under test

describe("Register a Project-Shift", () => {
  beforeEach(() => {
    inMemoryProjectShitRepository = new InMemoryProjectShiftRepository();
    sut = new RegisterProjectShift(inMemoryProjectShitRepository);
  });

  it("should register a project in a specifc shift", async () => {
    const result = await sut.execute({
      shiftId: "1",
      projectId: "2",
      projectStage: "LANÇAMENTO DE CABO",
      fieldReturn: "EXECUTADO",
      outOfSchedule: false,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.projectShift.id).toBeTruthy();
    expect(result.value?.projectShift.projectStage).toEqual(
      "LANÇAMENTO DE CABO"
    );
    expect(result.value?.projectShift.outOfSchedule).toEqual(false);
  });
});
