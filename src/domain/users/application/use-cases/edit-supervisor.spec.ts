/* eslint-disable @typescript-eslint/no-empty-function */
import { EditSupervisor } from "./edit-supervisor";
import { InMemorySupervisorRepository } from "test/repositories/in-memory-supervisor-repository";
import { makeSupervisor } from "test/factories/make-supervisor";

let inMemorySupervisorRepository: InMemorySupervisorRepository;
let sut: EditSupervisor; // system under test

describe("Edit VEHICLE Name By Id", () => {
  beforeEach(() => {
    inMemorySupervisorRepository = new InMemorySupervisorRepository();
    sut = new EditSupervisor(inMemorySupervisorRepository);
  });

  it("should be albe to edit a supervisor name by its id", async () => {
    const newSupervisor = await makeSupervisor({
      name: "João da Pamonha",
    });

    await inMemorySupervisorRepository.create(newSupervisor);

    await sut.execute({
      supervisorId: newSupervisor.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      name: "João da Pimbada",
    });

    expect(await inMemorySupervisorRepository.items[0]).toMatchObject({
      id: newSupervisor.id,
      name: "João da Pimbada",
    });
    expect(
      await inMemorySupervisorRepository.items[0].updated_at
    ).toBeInstanceOf(Date);
  });

  it("should not be albe to edit a supervisor name by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newSupervisor = await makeSupervisor({
      name: "João da Pamonha",
    });

    await inMemorySupervisorRepository.create(newSupervisor);

    expect(async () => {
      return await sut.execute({
        supervisorId: newSupervisor.id.toString(),
        programmerType: "CAMPO",
        name: "João da Pimbada",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
