/* eslint-disable @typescript-eslint/no-empty-function */
import { InMemoryTeamLeaderRepository } from "test/repositories/in-memory-teamLeader-repository";
import { RegisterTeam } from "./register-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";
import { InMemorySupervisorRepository } from "test/repositories/in-memory-supervisor-repository";
import { InMemoryCoordinatorRepository } from "test/repositories/in-memory-coordinator-repository";
import { makeSupervisor } from "test/factories/make-supervisor";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeTeamLeader } from "test/factories/make-teamLeader";

let inMemoryTeamRepository: InMemoryTeamRepository;
let inMemoryTeamLeaderRepository: InMemoryTeamLeaderRepository;
let inMemorySupervisorRepository: InMemorySupervisorRepository;
let inMemoryCoordinatorRepository: InMemoryCoordinatorRepository;
let sut: RegisterTeam; // system under test

describe("Register a Team", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    inMemoryTeamLeaderRepository = new InMemoryTeamLeaderRepository();
    inMemorySupervisorRepository = new InMemorySupervisorRepository();
    inMemoryCoordinatorRepository = new InMemoryCoordinatorRepository();
    sut = new RegisterTeam(
      inMemoryTeamRepository,
      inMemorySupervisorRepository,
      inMemoryTeamLeaderRepository,
      inMemoryCoordinatorRepository
    );
  });

  it("should register a team", async () => {
    const teamLeader = makeTeamLeader(
      { name: "Leader Name" },
      new UniqueEntityId("leader Id")
    );
    const supervisor = makeSupervisor(
      { name: "Supervisor Name" },
      new UniqueEntityId("Supervisor Id")
    );

    await inMemoryTeamLeaderRepository.create(teamLeader);
    await inMemorySupervisorRepository.create(supervisor);

    const result = await sut.execute({
      name: "ECOLM0001 - JOAO NUM SEI DAS QUANTAS",
      leaderId: "leader Id",
      supervisorId: "Supervisor Id",
      type: "LM",
      contract: "CENTRO-OESTE",
    });

    expect(result.isRight()).toBeTruthy();
    if (result.isRight()) {
      expect(result.value?.team.id).toBeTruthy();
      expect(result.value?.team.name).toEqual(
        "ECOLM0001 - JOAO NUM SEI DAS QUANTAS"
      );
      expect(result.value?.team.leaderId.getName()).toEqual("Leader Name");
      expect(result.value?.team.coordinatorId?.getId()).toBeUndefined();
    }
  });
});
