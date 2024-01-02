/* eslint-disable @typescript-eslint/no-empty-function */
import { EditTeam } from "./edit-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";
import { makeTeam } from "test/factories/make-team";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: EditTeam; // system under test

describe("Edit Team By Id", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new EditTeam(inMemoryTeamRepository);
  });

  it("should be albe to edit a team by its id", async () => {
    const newTeam = await makeTeam(
      { name: "ECOLM001" },
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryTeamRepository.create(newTeam);

    await sut.execute({
      teamId: newTeam.id.toString(),
      programmerType: "ADM",
      name: "ECOLM001",
      deactivation_date: new Date(),
    });

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

    expect(async () => {
      return await sut.execute({
        teamId: newTeam.id.toString(),
        programmerType: "CAMPO",
        name: "ECOLM001",
        deactivation_date: new Date(),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
