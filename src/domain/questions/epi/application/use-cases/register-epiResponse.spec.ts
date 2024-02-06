/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterEpiResponse } from "./register-epiResponse";
import { InMemoryEpiResponseRepository } from "test/repositories/in-memory-epiResponse-repository";

let inMemoryEpiResponseRepository: InMemoryEpiResponseRepository;
let sut: RegisterEpiResponse; // system under test

describe("Register a Epiresponse-Shift", () => {
  beforeEach(() => {
    inMemoryEpiResponseRepository = new InMemoryEpiResponseRepository();
    sut = new RegisterEpiResponse(inMemoryEpiResponseRepository);
  });

  it("should create a EPI response of a question", async () => {
    const result = await sut.execute({
      questionId: "QuestionId",
      shiftId: "ShiftId",
      userId: "user id - 1",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.epiResponse.id).toBeTruthy();
    expect(result.value?.epiResponse.userId).toBeInstanceOf(UniqueEntityId);
  });
});
