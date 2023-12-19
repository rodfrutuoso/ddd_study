/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterProjectShift } from "./register-projectShift";
import { InMemoryProjectShitRepository } from "test/repositories/in-memory-projectShift-repository";

let inMemoryProjectShitRepository: InMemoryProjectShitRepository;
let sut: RegisterProjectShift; // system under test

describe("Register Project-Shift", () => {
  beforeEach(() => {
    inMemoryProjectShitRepository = new InMemoryProjectShitRepository();
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

    expect(result.projectShift.id).toBeTruthy();
    expect(result.projectShift.projectStage).toEqual("LANÇAMENTO DE CABO");
    expect(result.projectShift.outOfSchedule).toEqual(false);
  });
});
