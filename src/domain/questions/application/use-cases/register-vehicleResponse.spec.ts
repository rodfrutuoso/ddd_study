/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterVehicleResponse } from "./register-vehicleResponse";
import { InMemoryVehicleResponseRepository } from "test/repositories/in-memory-vehicleResponse-repository";

let inMemoryVehicleResponseRepository: InMemoryVehicleResponseRepository;
let sut: RegisterVehicleResponse; // system under test

describe("Register a Vehicleresponse-Shift", () => {
  beforeEach(() => {
    inMemoryVehicleResponseRepository = new InMemoryVehicleResponseRepository();
    sut = new RegisterVehicleResponse(inMemoryVehicleResponseRepository);
  });

  it("should create a VEHICLE response of a question", async () => {
    const { vehicleResponse } = await sut.execute({
      questionId: "QuestionId",
      shiftId: "ShiftId",
      vehicleId: "vehicle id - 1",
    });

    expect(vehicleResponse.id).toBeTruthy();
    expect(vehicleResponse.vehicleId).toBeInstanceOf(UniqueEntityId);
  });
});
