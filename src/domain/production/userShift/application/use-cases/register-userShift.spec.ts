/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterUserShift } from "./register-userShift";
import { InMemoryUserShiftRepository } from "test/repositories/in-memory-userShift-repository";

let inMemoryProjectShitRepository: InMemoryUserShiftRepository;
let sut: RegisterUserShift; // system under test

describe("Register a User-Shift", () => {
  beforeEach(() => {
    inMemoryProjectShitRepository = new InMemoryUserShiftRepository();
    sut = new RegisterUserShift(inMemoryProjectShitRepository);
  });

  it("should register a user in a specifc shift", async () => {
    const result = await sut.execute({
      userId: "texto unico",
      shiftId: "2",
    });

    expect(result.value?.userShift.id).toBeTruthy();
    expect(result.value?.userShift.userId.toString()).toEqual("texto unico");
    expect(result.value?.userShift.shiftId.toString()).toEqual("2");
  });
});
