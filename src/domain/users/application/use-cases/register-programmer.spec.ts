/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterProgrammer } from "./register-programmer";
import { InMemoryProgrammerRepository } from "test/repositories/in-memory-programmer-repository";
import { makeProgrammer } from "test/factories/make-programmer";

let inMemoryProgrammerRepository: InMemoryProgrammerRepository;
let sut: RegisterProgrammer; // system under test

describe("Register a Programmer-Shift", () => {
  beforeEach(() => {
    inMemoryProgrammerRepository = new InMemoryProgrammerRepository();
    sut = new RegisterProgrammer(inMemoryProgrammerRepository);
  });

  it("should create a PROGRAMMER user", async () => {
    const { programmer } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "programmer",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(programmer.id).toBeTruthy();
    expect(programmer.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a programmer with an unsed email", async () => {
    const newProgrammer = makeProgrammer({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemoryProgrammerRepository.create(newProgrammer);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "programmer",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a programmer with an unsed cpf", async () => {
    const newProgrammer = makeProgrammer({ cpf: 12345678910 });

    await inMemoryProgrammerRepository.create(newProgrammer);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "programmer",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a programmer with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "programmer",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
