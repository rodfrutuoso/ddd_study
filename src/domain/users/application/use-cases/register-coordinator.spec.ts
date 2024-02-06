/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterCoordinator } from "./register-coordinator";
import { InMemoryCoordinatorRepository } from "test/repositories/in-memory-coordinator-repository";
import { makeCoordinator } from "test/factories/make-coordinator";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";

let inMemoryCoordinatorRepository: InMemoryCoordinatorRepository;
let sut: RegisterCoordinator; // system under test

describe("Register a Coordinator", () => {
  beforeEach(() => {
    inMemoryCoordinatorRepository = new InMemoryCoordinatorRepository();
    sut = new RegisterCoordinator(inMemoryCoordinatorRepository);
  });

  it("should create a COORDINATOR user", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "coordinator",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.coordinator.id).toBeTruthy();
      expect(result.value?.coordinator.created_by).toBeInstanceOf(
        UniqueEntityId
      );
    }
  });

  it("should not be able to create a coordinator with an unsed email", async () => {
    const newCoordinator = makeCoordinator({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemoryCoordinatorRepository.create(newCoordinator);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "coordinator",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EmailAlreadyRegistered);
  });

  it("should not be able to create a coordinator with an unsed cpf", async () => {
    const newCoordinator = makeCoordinator({ cpf: 12345678910 });

    await inMemoryCoordinatorRepository.create(newCoordinator);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "coordinator",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(CpfAlreadyRegistered);
  });

  it("should not be able to create a coordinator with an email that is not from ecoeletrica.com.br", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@gmail.com.br",
      password: "minhaSenha",
      type: "coordinator",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.value).toBeInstanceOf(EmailNotEcoeletrica);
    expect(result.isLeft()).toBeTruthy();
  });
});
