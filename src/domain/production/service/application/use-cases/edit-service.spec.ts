/* eslint-disable @typescript-eslint/no-empty-function */
import { EditService } from "./edit-service";
import { InMemoryServiceRepository } from "test/repositories/in-memory-service-repository";
import { makeService } from "test/factories/make-service";

let inMemoryServiceRepository: InMemoryServiceRepository;
let sut: EditService; // system under test

describe("Edit Service By Id", () => {
  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository();
    sut = new EditService(inMemoryServiceRepository);
  });

  it("should be albe to edit a service by its id", async () => {
    const newService = await makeService({
      description: "INSTALAR POSTE DE 9 A 14 METROS",
    });

    await inMemoryServiceRepository.create(newService);

    const result = await sut.execute({
      serviceId: newService.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      description: "INSTALAR POSTE DE 9 METROS",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryServiceRepository.items[0]).toMatchObject({
      description: "INSTALAR POSTE DE 9 METROS",
    });
  });

  it("should not be albe to edit a service by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newService = await makeService({
      description: "INSTALAR POSTE DE 9 A 14 METROS",
    });

    await inMemoryServiceRepository.create(newService);

    const result = await sut.execute({
      serviceId: newService.id.toString(),
      programmerType: "campo",
      description: "INSTALAR POSTE DE 9 METROS",
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
