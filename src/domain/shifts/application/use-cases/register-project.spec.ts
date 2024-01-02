/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterProject } from "./register-project";
import { InMemoryProjectRepository } from "test/repositories/in-memory-project-repository";

let inMemoryProjectShitRepository: InMemoryProjectRepository;
let sut: RegisterProject; // system under test

describe("Register a Project-Shift", () => {
  beforeEach(() => {
    inMemoryProjectShitRepository = new InMemoryProjectRepository();
    sut = new RegisterProject(inMemoryProjectShitRepository);
  });

  it("should register a project in a specifc shift", async () => {
    const { newProject } = await sut.execute({
      project: "B-12345678",
      description: "MP-FAZENDA-DO-SEU-LONGUINHO",
      utd: "ITABERABA",
      city: "ITABERABA",
    });

    expect(newProject.id).toBeTruthy();
    expect(newProject.utd).toEqual("ITABERABA");
    expect(newProject.project).toEqual("B-12345678");
  });
});
