/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterTeamLeader } from "./register-teamLeader";
import { InMemoryTeamLeaderRepository } from "test/repositories/in-memory-teamLeader-repository";
import { makeTeamLeader } from "test/factories/make-teamLeader";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";

let inMemoryTeamLeaderRepository: InMemoryTeamLeaderRepository;
let sut: RegisterTeamLeader; // system under test

describe("Register a TeamLeader-Shift", () => {
  beforeEach(() => {
    inMemoryTeamLeaderRepository = new InMemoryTeamLeaderRepository();
    sut = new RegisterTeamLeader(inMemoryTeamLeaderRepository);
  });

  it("should create a TEAMLEADER user", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "teamleader",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team Id 1",
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.teamleader.id).toBeTruthy();
      expect(result.value?.teamleader.created_by).toBeInstanceOf(
        UniqueEntityId
      );
    }
  });

  it("should not be able to create a teamleader with an unsed email", async () => {
    const newTeamLeader = makeTeamLeader({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemoryTeamLeaderRepository.create(newTeamLeader);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "teamleader",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team Id 1",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EmailAlreadyRegistered);
  });

  it("should not be able to create a teamleader with an unsed cpf", async () => {
    const newTeamLeader = makeTeamLeader({ cpf: 12345678910 });

    await inMemoryTeamLeaderRepository.create(newTeamLeader);

    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "teamleader",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team Id 1",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(CpfAlreadyRegistered);
  });

  it("should not be able to create a teamleader with an email that is not from ecoeletrica.com.br", async () => {
    const result = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678910,
      email: "joaopamonha@gmail.com.br",
      password: "minhaSenha",
      type: "teamleader",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team Id 1",
    });

    expect(result.value).toBeInstanceOf(EmailNotEcoeletrica);
    expect(result.isLeft()).toBeTruthy();
  });
});
