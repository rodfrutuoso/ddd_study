/* eslint-disable @typescript-eslint/no-empty-function */
import { EditCoordinator } from "./edit-coordinator";
import { InMemoryCoordinatorRepository } from "test/repositories/in-memory-coordinator-repository";
import { makeCoordinator } from "test/factories/make-coordinator";

let inMemoryCoordinatorRepository: InMemoryCoordinatorRepository;
let sut: EditCoordinator; // system under test

describe("Edit VEHICLE Name By Id", () => {
  beforeEach(() => {
    inMemoryCoordinatorRepository = new InMemoryCoordinatorRepository();
    sut = new EditCoordinator(inMemoryCoordinatorRepository);
  });

  it("should be albe to edit a coordinator name by its id", async () => {
    const newCoordinator = await makeCoordinator({
      name: "João da Pamonha",
    });

    await inMemoryCoordinatorRepository.create(newCoordinator);

    const result = await sut.execute({
      coordinatorId: newCoordinator.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      name: "João da Pimbada",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryCoordinatorRepository.items[0]).toMatchObject({
      id: newCoordinator.id,
      name: "João da Pimbada",
    });
    expect(
      await inMemoryCoordinatorRepository.items[0].updated_at
    ).toBeInstanceOf(Date);
  });

  it("should not be albe to edit a coordinator name by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newCoordinator = await makeCoordinator({
      name: "João da Pamonha",
    });

    await inMemoryCoordinatorRepository.create(newCoordinator);

    const result = await sut.execute({
      coordinatorId: newCoordinator.id.toString(),
      programmerType: "CAMPO",
      name: "João da Pimbada",
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
