/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterCoordinator } from "./register-coordinator";
import { InMemoryCoordinatorRepository } from "test/repositories/in-memory-coordinator-repository";
import { makeCoordinator } from "test/factories/make-coordinator";

let inMemoryCoordinatorRepository: InMemoryCoordinatorRepository;
let sut: RegisterCoordinator; // system under test

describe("Register a Coordinator-Shift", () => {
  beforeEach(() => {
    inMemoryCoordinatorRepository = new InMemoryCoordinatorRepository();
    sut = new RegisterCoordinator(inMemoryCoordinatorRepository);
  });

  it("should create a COORDINATOR user", async () => {
    const { coordinator } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "coordinator",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(coordinator.id).toBeTruthy();
    expect(coordinator.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a coordinator with an unsed email", async () => {
    const newCoordinator = makeCoordinator({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemoryCoordinatorRepository.create(newCoordinator);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "coordinator",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a coordinator with an unsed cpf", async () => {
    const newCoordinator = makeCoordinator({ cpf: 12345678910 });

    await inMemoryCoordinatorRepository.create(newCoordinator);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "coordinator",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a coordinator with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "coordinator",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
