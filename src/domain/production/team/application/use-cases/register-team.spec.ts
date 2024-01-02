/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterTeam } from "./register-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: RegisterTeam; // system under test

describe("Register a Team", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new RegisterTeam(inMemoryTeamRepository);
  });

  it("should register a team", async () => {
    const { team } = await sut.execute({
      name: "ECOLM0001 - JOAO NUM SEI DAS QUANTAS",
      leaderId: "id da equipe",
      supervisorId: "id do supervisor",
      type: "LM",
      contract: "CENTRO-OESTE",
    });

    expect(team.id).toBeTruthy();
    expect(team.name).toEqual("ECOLM0001 - JOAO NUM SEI DAS QUANTAS");
    expect(team.coordinatorId).toBeUndefined();
  });
});
