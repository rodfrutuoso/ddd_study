/* eslint-disable @typescript-eslint/no-empty-function */
import { EditOperational } from "./edit-operational";
import { InMemoryOperationalRepository } from "test/repositories/in-memory-operational-repository";
import { makeOperational } from "test/factories/make-operational";

let inMemoryOperationalRepository: InMemoryOperationalRepository;
let sut: EditOperational; // system under test

describe("Edit VEHICLE Name By Id", () => {
  beforeEach(() => {
    inMemoryOperationalRepository = new InMemoryOperationalRepository();
    sut = new EditOperational(inMemoryOperationalRepository);
  });

  it("should be albe to edit a operational name by its id", async () => {
    const newOperational = await makeOperational({
      name: "João da Pamonha",
    });

    await inMemoryOperationalRepository.create(newOperational);

    await sut.execute({
      operationalId: newOperational.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      name: "João da Pimbada",
    });

    expect(await inMemoryOperationalRepository.items[0]).toMatchObject({
      id: newOperational.id,
      name: "João da Pimbada",
    });
    expect(
      await inMemoryOperationalRepository.items[0].updated_at
    ).toBeInstanceOf(Date);
  });

  it("should not be albe to edit a operational name by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newOperational = await makeOperational({
      name: "João da Pamonha",
    });

    await inMemoryOperationalRepository.create(newOperational);

    expect(async () => {
      return await sut.execute({
        operationalId: newOperational.id.toString(),
        programmerType: "CAMPO",
        name: "João da Pimbada",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
