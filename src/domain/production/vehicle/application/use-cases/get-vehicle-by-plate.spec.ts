import { GetVehicleByPlate } from "./get-vehicle-by-plate";
import { InMemoryVehicleRepository } from "test/repositories/in-memory-vehicle-repository";
import { makeVehicle } from "test/factories/make-vehicle";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let sut: GetVehicleByPlate; // system under test

describe("Get Vehicle By plate", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    sut = new GetVehicleByPlate(inMemoryVehicleRepository);
  });

  it("should be able filter a list of vehicles by plate", async () => {
    const newVehicle1 = makeVehicle({
      plate: "RPA2J17",
    });
    const newVehicle2 = makeVehicle({
      plate: "RPA2J17",
    });
    const newVehicle3 = makeVehicle();

    await inMemoryVehicleRepository.create(newVehicle1);
    await inMemoryVehicleRepository.create(newVehicle2);
    await inMemoryVehicleRepository.create(newVehicle3);

    const { vehicles } = await sut.execute({
      page: 1,
      plate: "RPA2J17",
    });

    expect(vehicles).toHaveLength(2);
  });

  it("should be able to get a empty list of vehicles when there is no vehicle of the informed plate", async () => {
    const newVehicle1 = makeVehicle();
    const newVehicle2 = makeVehicle();
    const newVehicle3 = makeVehicle();

    await inMemoryVehicleRepository.create(newVehicle1);
    await inMemoryVehicleRepository.create(newVehicle2);
    await inMemoryVehicleRepository.create(newVehicle3);

    const { vehicles } = await sut.execute({
      plate: "RPA2J17",
      page: 1,
    });

    expect(vehicles).toHaveLength(0);
  });

  it("should be able paginate a list of vehicles of a vehicle", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryVehicleRepository.create(
        makeVehicle({
          plate: "RPA2J17",
        })
      );
    }

    const { vehicles } = await sut.execute({
      page: 2,
      plate: "RPA2J17",
    });

    expect(vehicles).toHaveLength(5);
  });
});
