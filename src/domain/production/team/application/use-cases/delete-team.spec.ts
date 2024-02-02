/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteTeam } from "./delete-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";
import { makeTeam } from "test/factories/make-team";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: DeleteTeam; // system under test

describe("Delete Team By Id", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new DeleteTeam(inMemoryTeamRepository);
  });

  it("should be albe to delete a team by its id", async () => {
    const newTeam = await makeTeam({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryTeamRepository.create(newTeam);

    const result = await sut.execute({
      teamId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryTeamRepository.findById("abc-123-xyz")).toBeNull();
    expect(await inMemoryTeamRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a team by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newTeam = await makeTeam({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryTeamRepository.create(newTeam);

    const result = await sut.execute({
      teamId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(await inMemoryTeamRepository.findById("abc-123-xyz")).toBeTruthy();
    expect(await inMemoryTeamRepository.items).toHaveLength(1);
  });
});
