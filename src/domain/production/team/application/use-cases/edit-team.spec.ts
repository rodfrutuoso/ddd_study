/* eslint-disable @typescript-eslint/no-empty-function */
import { EditTeam } from "./edit-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";
import { makeTeam } from "test/factories/make-team";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { InMemoryTeamLeaderRepository } from "test/repositories/in-memory-teamLeader-repository";
import { InMemorySupervisorRepository } from "test/repositories/in-memory-supervisor-repository";
import { InMemoryCoordinatorRepository } from "test/repositories/in-memory-coordinator-repository";
import { makeTeamLeader } from "test/factories/make-teamLeader";
import { makeSupervisor } from "test/factories/make-supervisor";
import { makeCoordinator } from "test/factories/make-coordinator";
import { UserNameId } from "@/core/entities/userNameId";

let inMemoryTeamRepository: InMemoryTeamRepository;
let inMemoryTeamLeaderRepository: InMemoryTeamLeaderRepository;
let inMemorySupervisorRepository: InMemorySupervisorRepository;
let inMemoryCoordinatorRepository: InMemoryCoordinatorRepository;
let sut: EditTeam; // system under test

describe("Edit Team By Id", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    inMemoryTeamLeaderRepository = new InMemoryTeamLeaderRepository();
    inMemorySupervisorRepository = new InMemorySupervisorRepository();
    inMemoryCoordinatorRepository = new InMemoryCoordinatorRepository();
    sut = new EditTeam(
      inMemoryTeamRepository,
      inMemorySupervisorRepository,
      inMemoryTeamLeaderRepository,
      inMemoryCoordinatorRepository
    );
  });

  it("should be albe to edit a team by its id", async () => {
    const newTeam = await makeTeam(
      { name: "ECOLM001" },
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryTeamRepository.create(newTeam);

    const result = await sut.execute({
      teamId: newTeam.id.toString(),
      programmerType: "ADM",
      name: "ECOLM001",
      deactivation_date: new Date(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryTeamRepository.items[0]).toMatchObject({
      name: "ECOLM001",
    });
    expect(
      await inMemoryTeamRepository.items[0].deactivation_date
    ).toBeInstanceOf(Date);
  });

  it("should not be albe to edit a team by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newTeam = await makeTeam(
      { name: "ECOLM001" },
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryTeamRepository.create(newTeam);

    const result = await sut.execute({
      teamId: newTeam.id.toString(),
      programmerType: "CAMPO",
      name: "ECOLM001",
      deactivation_date: new Date(),
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should be albe to edit the supervisor, leader and coordinator team by its id", async () => {
    const leader = await makeTeamLeader();
    await inMemoryTeamLeaderRepository.create(leader);

    const supervisor = await makeSupervisor();
    await inMemorySupervisorRepository.create(supervisor);

    const coordinator = await makeCoordinator();
    await inMemoryCoordinatorRepository.create(coordinator);

    const newTeam = await makeTeam(
      { name: "ECOLM001" },
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryTeamRepository.create(newTeam);

    const result = await sut.execute({
      teamId: newTeam.id.toString(),
      programmerType: "PROGRAMAÇÃO",
      supervisorId: supervisor.id.toString(),
      leaderId: leader.id.toString(),
      coordinatorId: coordinator.id.toString(),
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryTeamRepository.items[0]).toMatchObject({
      supervisorId: new UserNameId(supervisor.name, supervisor.id),
      leaderId: new UserNameId(leader.name, leader.id),
      coordinatorId: new UserNameId(coordinator.name, coordinator.id),
    });
  });
});
