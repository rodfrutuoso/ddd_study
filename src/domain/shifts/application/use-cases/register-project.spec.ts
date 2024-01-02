/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterProject } from "./register-project";
import { InMemoryProjectRepository } from "test/repositories/in-memory-project-repository";

let inMemoryProjectRepository: InMemoryProjectRepository;
let sut: RegisterProject; // system under test

describe("Register a Project-Shift", () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    sut = new RegisterProject(inMemoryProjectRepository);
  });

  it("should register a project in a specifc shift", async () => {
    const { project } = await sut.execute({
      projectCode: "B-12345678",
      description: "MP-FAZENDA-DO-SEU-LONGUINHO",
      utd: "ITABERABA",
      city: "ITABERABA",
    });

    expect(project.id).toBeTruthy();
    expect(project.utd).toEqual("ITABERABA");
    expect(project.projectCode).toEqual("B-12345678");
  });
});
