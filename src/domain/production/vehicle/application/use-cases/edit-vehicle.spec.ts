/* eslint-disable @typescript-eslint/no-empty-function */
import { EditVehicle } from "./edit-vehicle";
import { InMemoryVehicleRepository } from "test/repositories/in-memory-vehicle-repository";
import { makeVehicle } from "test/factories/make-vehicle";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let sut: EditVehicle; // system under test

describe("Edit Vehicle By Id", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    sut = new EditVehicle(inMemoryVehicleRepository);
  });

  it("should be albe to edit a vehicle by its id", async () => {
    const newVehicle = await makeVehicle({
      type: "LEVE",
    });

    await inMemoryVehicleRepository.create(newVehicle);

    const result = await sut.execute({
      vehicleId: newVehicle.id.toString(),
      programmerType: "ADM",
      type: "CAMINHÃO",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryVehicleRepository.items[0]).toMatchObject({
      id: newVehicle.id,
      type: "CAMINHÃO",
    });
  });

  it("should not be albe to edit a vehicle by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newVehicle = await makeVehicle({
      type: "LEVE",
    });

    await inMemoryVehicleRepository.create(newVehicle);

    const result = await sut.execute({
      vehicleId: newVehicle.id.toString(),
      programmerType: "CAMPO",
      type: "CAMINHÃO",
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
