import { RegisterVehicle } from "./register-vehicle";
import { InMemoryVehicleRepository } from "test/repositories/in-memory-vehicle-repository";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let sut: RegisterVehicle; // system under test

describe("Register a Vehicle-Shift", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    sut = new RegisterVehicle(inMemoryVehicleRepository);
  });

  it("should register a vehicle in a specifc shift", async () => {
    const result = await sut.execute({
      plate: "RPA2J17",
      teamId: "team-id-test",
      type: "LEVE",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehicle.id).toBeTruthy();
    expect(result.value?.vehicle.plate).toEqual("RPA2J17");
    expect(result.value?.vehicle.type).toEqual("LEVE");
  });
});
