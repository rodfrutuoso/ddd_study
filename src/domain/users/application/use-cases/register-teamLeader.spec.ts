/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { RegisterTeamLeader } from "./register-teamLeader";
import { InMemoryTeamLeaderRepository } from "test/repositories/in-memory-teamLeader-repository";
import { makeTeamLeader } from "test/factories/make-teamLeader";

let inMemoryTeamLeaderRepository: InMemoryTeamLeaderRepository;
let sut: RegisterTeamLeader; // system under test

describe("Register a TeamLeader-Shift", () => {
  beforeEach(() => {
    inMemoryTeamLeaderRepository = new InMemoryTeamLeaderRepository();
    sut = new RegisterTeamLeader(inMemoryTeamLeaderRepository);
  });

  it("should create a TEAMLEADER user", async () => {
    const { teamleader } = await sut.execute({
      name: "João da Pamonha",
      cpf: 12345678,
      email: "joaopamonha@ecoeletrica.com.br",
      password: "minhaSenha",
      type: "teamleader",
      created_by: "uuid-da-pessoa-que-criou",
      teamId: "team Id 1",
    });

    expect(teamleader.id).toBeTruthy();
    expect(teamleader.created_by).toBeInstanceOf(UniqueEntityId);
  });

  it("should not be able to create a teamleader with an unsed email", async () => {
    const newTeamLeader = makeTeamLeader({
      email: "joaopamonha@ecoeletrica.com.br",
    });

    await inMemoryTeamLeaderRepository.create(newTeamLeader);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "teamleader",
        created_by: "uuid-da-pessoa-que-criou",
        teamId: "team Id 1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a teamleader with an unsed cpf", async () => {
    const newTeamLeader = makeTeamLeader({ cpf: 12345678910 });

    await inMemoryTeamLeaderRepository.create(newTeamLeader);

    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@ecoeletrica.com.br",
        password: "minhaSenha",
        type: "teamleader",
        created_by: "uuid-da-pessoa-que-criou",
        teamId: "team Id 1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to create a teamleader with an email that is not from ecoeletrica.com.br", async () => {
    expect(async () => {
      return await sut.execute({
        name: "João da Pamonha",
        cpf: 12345678910,
        email: "joaopamonha@gmail.com.br",
        password: "minhaSenha",
        type: "teamleader",
        created_by: "uuid-da-pessoa-que-criou",
        teamId: "team Id 1",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
