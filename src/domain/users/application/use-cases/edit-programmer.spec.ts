/* eslint-disable @typescript-eslint/no-empty-function */
import { EditProgrammer } from "./edit-programmer";
import { InMemoryProgrammerRepository } from "test/repositories/in-memory-programmer-repository";
import { makeProgrammer } from "test/factories/make-programmer";

let inMemoryProgrammerRepository: InMemoryProgrammerRepository;
let sut: EditProgrammer; // system under test

describe("Edit VEHICLE Name By Id", () => {
  beforeEach(() => {
    inMemoryProgrammerRepository = new InMemoryProgrammerRepository();
    sut = new EditProgrammer(inMemoryProgrammerRepository);
  });

  it("should be albe to edit a programmer name by its id", async () => {
    const newProgrammer = await makeProgrammer({
      name: "João da Pamonha",
    });

    await inMemoryProgrammerRepository.create(newProgrammer);

    const result = await sut.execute({
      programmerId: newProgrammer.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      name: "João da Pimbada",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryProgrammerRepository.items[0]).toMatchObject({
      id: newProgrammer.id,
      name: "João da Pimbada",
    });
    expect(
      await inMemoryProgrammerRepository.items[0].updated_at
    ).toBeInstanceOf(Date);
  });

  it("should not be albe to edit a programmer name by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newProgrammer = await makeProgrammer({
      name: "João da Pamonha",
    });

    await inMemoryProgrammerRepository.create(newProgrammer);

    const result = await sut.execute({
      programmerId: newProgrammer.id.toString(),
      programmerType: "CAMPO",
      name: "João da Pimbada",
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
