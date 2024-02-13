/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterSupervisor } from "./register-supervisor";
import { InMemorySupervisorRepository } from "test/repositories/in-memory-supervisor-repository";
import { makeSupervisor } from "test/factories/make-supervisor";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";

let inMemorySupervisorRepository: InMemorySupervisorRepository;
let sut: RegisterSupervisor; // system under test

describe("Register a Supervisor-Shift", () => {
  beforeEach(() => {
    inMemorySupervisorRepository = new InMemorySupervisorRepository();
    sut = new RegisterSupervisor(inMemorySupervisorRepository);
  });

  it("should create a SUPERVISOR user", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "supervisor",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.supervisor.id).toBeTruthy();
      expect(result.value?.supervisor.created_by).toBeInstanceOf(
        UniqueEntityId
      );
    }
  });

  it("should not be able to create a supervisor with an unsed email", async () => {
    const newSupervisor = makeSupervisor({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemorySupervisorRepository.create(newSupervisor);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "supervisor",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EmailAlreadyRegistered);
  });

  it("should not be able to create a supervisor with an unsed cpf", async () => {
    const newSupervisor = makeSupervisor({ cpf: 12345678910 });

    await inMemorySupervisorRepository.create(newSupervisor);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "supervisor",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(CpfAlreadyRegistered);
  });

  it("should not be able to create a supervisor with an email that is not from ecoeletrica.com.br", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@gmail.com.br",
      password: "minhaSenha",
      type: "supervisor",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(result.value).toBeInstanceOf(EmailNotEcoeletrica);
    expect(result.isLeft()).toBeTruthy();
  });
});
