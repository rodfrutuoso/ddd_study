/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterOperational } from "./register-operational";
import { InMemoryOperationalRepository } from "test/repositories/in-memory-operational-repository";
import { makeOperational } from "test/factories/make-operational";

let inMemoryOperationalRepository: InMemoryOperationalRepository;
let sut: RegisterOperational; // system under test

describe("Register a Operational-Shift", () => {
  beforeEach(() => {
    inMemoryOperationalRepository = new InMemoryOperationalRepository();
    sut = new RegisterOperational(inMemoryOperationalRepository);
  });

  it("should create a Operational user", async () => {
    const { operational } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "operational",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team Id 1",
    });

    expect(operational.id).toBeTruthy();
    expect(operational.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a operational with an unsed email", async () => {
    const newOperational = makeOperational({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemoryOperationalRepository.create(newOperational);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "operational",
        created_by: "uuid-da-pessoa-que-criou",
        teamId: "team Id 1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a operational with an unsed cpf", async () => {
    const newOperational = makeOperational({ cpf: 12345678910 });

    await inMemoryOperationalRepository.create(newOperational);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "operational",
        created_by: "uuid-da-pessoa-que-criou",
        teamId: "team Id 1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a operational with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "operational",
        created_by: "uuid-da-pessoa-que-criou",
        teamId: "team Id 1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
