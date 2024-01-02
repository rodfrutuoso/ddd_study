/* eslint-disable @typescript-eslint/no-empty-function */
import { EditProject } from "./edit-project";
import { InMemoryProjectRepository } from "test/repositories/in-memory-project-repository";
import { makeProject } from "test/factories/make-project";

let inMemoryProjectRepository: InMemoryProjectRepository;
let sut: EditProject; // system under test

describe("Edit Project By Id", () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    sut = new EditProject(inMemoryProjectRepository);
  });

  it("should be albe to edit a project by its id", async () => {
    const newProject = await makeProject({
      description: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryProjectRepository.create(newProject);

    await sut.execute({
      projectId: newProject.id.toString(),
      programmerType: "ADM",
      description: "FAZENDA-CONHECIDA",
    });

    expect(await inMemoryProjectRepository.items[0]).toMatchObject({
      id: newProject.id,
      description: "FAZENDA-CONHECIDA",
    });
  });

  it("should not be albe to edit a project by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newProject = await makeProject({
      description: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryProjectRepository.create(newProject);

    expect(async () => {
      return await sut.execute({
        projectId: newProject.id.toString(),
        programmerType: "CAMPO",
        description: "FAZENDA-CONHECIDA",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
