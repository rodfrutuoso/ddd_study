/* eslint-disable @typescript-eslint/no-empty-function */
import { CreateVehicleQuestion } from "./create-vehicleQuestion";
import { InMemoryVehicleQuestionRepository } from "test/repositories/in-memory-vehicleQuestion-repository";

let inMemoryVehicleQuestionRepository: InMemoryVehicleQuestionRepository;
let sut: CreateVehicleQuestion; // system under test

describe("Register a VehicleQuestion-Shift", () => {
  beforeEach(() => {
    inMemoryVehicleQuestionRepository = new InMemoryVehicleQuestionRepository();
    sut = new CreateVehicleQuestion(inMemoryVehicleQuestionRepository);
  });

  it("should create a VEHICLE Question", async () => {
    const { vehicleQuestion } = await sut.execute({
      question: "A câmera está funcionando corretamente?",
    });

    expect(vehicleQuestion.id).toBeTruthy();
    expect(vehicleQuestion.question).toEqual(
      "A câmera está funcionando corretamente?"
    );
  });
});
