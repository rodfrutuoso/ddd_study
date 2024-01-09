/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterSupervisor } from "./register-supervisor";
import { InMemorySupervisorRepository } from "test/repositories/in-memory-supervisor-repository";
import { makeSupervisor } from "test/factories/make-supervisor";

let inMemorySupervisorRepository: InMemorySupervisorRepository;
let sut: RegisterSupervisor; // system under test

describe("Register a Supervisor-Shift", () => {
  beforeEach(() => {
    inMemorySupervisorRepository = new InMemorySupervisorRepository();
    sut = new RegisterSupervisor(inMemorySupervisorRepository);
  });

  it("should create a SUPERVISOR user", async () => {
    const { supervisor } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "supervisor",
      created_by: "uuid-da-pessoa-que-criou",
    });

    expect(supervisor.id).toBeTruthy();
    expect(supervisor.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a supervisor with an unsed email", async () => {
    const newSupervisor = makeSupervisor({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemorySupervisorRepository.create(newSupervisor);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "supervisor",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a supervisor with an unsed cpf", async () => {
    const newSupervisor = makeSupervisor({ cpf: 12345678910 });

    await inMemorySupervisorRepository.create(newSupervisor);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "supervisor",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a supervisor with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "supervisor",
        created_by: "uuid-da-pessoa-que-criou",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
