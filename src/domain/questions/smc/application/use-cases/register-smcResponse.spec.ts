/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterSmcResponse } from "./register-smcResponse";
import { InMemorySmcResponseRepository } from "test/repositories/in-memory-smcResponse-repository";

let inMemorySmcResponseRepository: InMemorySmcResponseRepository;
let sut: RegisterSmcResponse; // system under test

describe("Register a Smcresponse-Shift", () => {
  beforeEach(() => {
    inMemorySmcResponseRepository = new InMemorySmcResponseRepository();
    sut = new RegisterSmcResponse(inMemorySmcResponseRepository);
  });

  it("should create a SMC response of a question", async () => {
    const { smcResponse } = await sut.execute({
      questionId: "QuestionId",
      shiftId: "ShiftId",
      flaw: "The camera batery is losing power fast",
    });

    expect(smcResponse.id).toBeTruthy();
    expect(smcResponse.flaw).toEqual("The camera batery is losing power fast");
  });
});
