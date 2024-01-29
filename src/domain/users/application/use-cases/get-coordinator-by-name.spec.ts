import { GetCoordinatorByName } from "./get-coordinator-by-name";
import { InMemoryCoordinatorRepository } from "test/repositories/in-memory-coordinator-repository";
import { makeCoordinator } from "test/factories/make-coordinator";

let inMemoryCoordinatorRepository: InMemoryCoordinatorRepository;
let sut: GetCoordinatorByName; // system under test

describe("Get Coordinator By Coordinator", () => {
  beforeEach(() => {
    inMemoryCoordinatorRepository = new InMemoryCoordinatorRepository();
    sut = new GetCoordinatorByName(inMemoryCoordinatorRepository);
  });

  it("should be able to get a list of coordinator's of a name", async () => {
    const newCoordinator1 = makeCoordinator({
      name: "João da Pamonha?",
    });
    const newCoordinator2 = makeCoordinator({
      name: "João da Pimbada",
    });
    const newCoordinator3 = makeCoordinator({
      name: "Rafael da Pamonha",
    });

    await inMemoryCoordinatorRepository.create(newCoordinator1);
    await inMemoryCoordinatorRepository.create(newCoordinator2);
    await inMemoryCoordinatorRepository.create(newCoordinator3);

    const { coordinator } = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(coordinator).toHaveLength(2);
    expect(coordinator).not.toContain(newCoordinator3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newCoordinator1 = makeCoordinator({
      name: "João da Pamonha?",
    });
    const newCoordinator2 = makeCoordinator({
      name: "João da Pimbada",
    });
    const newCoordinator3 = makeCoordinator({
      name: "Rafael da Pamonha",
    });

    await inMemoryCoordinatorRepository.create(newCoordinator1);
    await inMemoryCoordinatorRepository.create(newCoordinator2);
    await inMemoryCoordinatorRepository.create(newCoordinator3);

    const { coordinator } = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(coordinator).toHaveLength(0);
  });

  it("should be able paginate a list of coordinators of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryCoordinatorRepository.create(
        makeCoordinator({
          name: "João da Pamonha?",
        })
      );
    }

    const { coordinator } = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(coordinator).toHaveLength(7);
  });
});
