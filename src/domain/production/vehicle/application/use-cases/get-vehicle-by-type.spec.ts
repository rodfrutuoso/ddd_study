import { GetVehicleByType } from "./get-vehicle-by-type";
import { InMemoryVehicleRepository } from "test/repositories/in-memory-vehicle-repository";
import { makeVehicle } from "test/factories/make-vehicle";

let inMemoryVehicleRepository: InMemoryVehicleRepository;
let sut: GetVehicleByType; // system under test

describe("Get Vehicle By type", () => {
  beforeEach(() => {
    inMemoryVehicleRepository = new InMemoryVehicleRepository();
    sut = new GetVehicleByType(inMemoryVehicleRepository);
  });

  it("should be able filter a list of vehicles by type", async () => {
    const newVehicle1 = makeVehicle({
      type: "LEVE",
    });
    const newVehicle2 = makeVehicle({
      type: "LEVE",
    });
    const newVehicle3 = makeVehicle();

    await inMemoryVehicleRepository.create(newVehicle1);
    await inMemoryVehicleRepository.create(newVehicle2);
    await inMemoryVehicleRepository.create(newVehicle3);

    const result = await sut.execute({
      page: 1,
      type: "LEVE",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehicles).toHaveLength(2);
  });

  it("should be able to get a empty list of vehicles when there is no vehicle of the informed type", async () => {
    const newVehicle1 = makeVehicle();
    const newVehicle2 = makeVehicle();
    const newVehicle3 = makeVehicle();

    await inMemoryVehicleRepository.create(newVehicle1);
    await inMemoryVehicleRepository.create(newVehicle2);
    await inMemoryVehicleRepository.create(newVehicle3);

    const result = await sut.execute({
      type: "LEVE",
      page: 1,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehicles).toHaveLength(0);
  });

  it("should be able paginate a list of vehicles of a vehicle", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryVehicleRepository.create(
        makeVehicle({
          type: "LEVE",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      type: "LEVE",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehicles).toHaveLength(5);
  });
});
