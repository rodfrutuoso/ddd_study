/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterService } from "./create-service";
import { InMemoryServiceRepository } from "test/repositories/in-memory-service-repository";

let inMemoryServiceRepository: InMemoryServiceRepository;
let sut: RegisterService; // system under test

describe("Register a Service", () => {
  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository();
    sut = new RegisterService(inMemoryServiceRepository);
  });

  it("should register a service", async () => {
    const { service } = await sut.execute({
      code: "ESDMU0047",
      description: "IMPLANTAR POSTE DE 9 A 14 METROS",
    });

    expect(service.id).toBeTruthy();
    expect(service.code).toEqual("ESDMU0047");
  });
});
