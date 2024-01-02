import { GetProjectByProject } from "./get-project-by-project";
import { InMemoryProjectRepository } from "test/repositories/in-memory-project-repository";
import { makeProject } from "test/factories/make-project";

let inMemoryProjectRepository: InMemoryProjectRepository;
let sut: GetProjectByProject; // system under test

describe("Get Project By Project", () => {
  beforeEach(() => {
    inMemoryProjectRepository = new InMemoryProjectRepository();
    sut = new GetProjectByProject(inMemoryProjectRepository);
  });

  it("should be able to get a list of projects of a projectCode", async () => {
    const newProject1 = makeProject({
      projectCode: "B-1012505",
    });
    const newProject2 = makeProject({
      projectCode: "B-1012505",
    });
    const newProject3 = makeProject();

    await inMemoryProjectRepository.create(newProject1);
    await inMemoryProjectRepository.create(newProject2);
    await inMemoryProjectRepository.create(newProject3);

    console.log(inMemoryProjectRepository.items);

    const { project } = await sut.execute({
      page: 1,
      projectCode: "B-1012505",
    });

    expect(project).toHaveLength(2);
    expect(project).not.toContain(newProject3);
  });

  it("should be able to get a empty list of projects when there is no projects with the informed shiftId ", async () => {
    const newProject1 = makeProject();
    const newProject2 = makeProject();
    const newProject3 = makeProject();

    await inMemoryProjectRepository.create(newProject1);
    await inMemoryProjectRepository.create(newProject2);
    await inMemoryProjectRepository.create(newProject3);

    const { project } = await sut.execute({
      projectCode: "B-1012505",
      page: 1,
    });

    expect(project).toHaveLength(0);
  });

  it("should be able paginate a list of projects of a projectCode", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryProjectRepository.create(
        makeProject({
          projectCode: "B-1012505",
        })
      );
    }

    const { project } = await sut.execute({
      projectCode: "B-1012505",
      page: 2,
    });

    expect(project).toHaveLength(7);
  });

  it("should be able to get a list of projects of a parcial projectCode informed", async () => {
    const newProject1 = makeProject({
      projectCode: "B-1012505",
    });
    const newProject2 = makeProject({
      projectCode: "B-1012505",
    });
    const newProject3 = makeProject();

    await inMemoryProjectRepository.create(newProject1);
    await inMemoryProjectRepository.create(newProject2);
    await inMemoryProjectRepository.create(newProject3);

    console.log(inMemoryProjectRepository.items);

    const { project } = await sut.execute({
      page: 1,
      projectCode: "1012505",
    });

    expect(project).toHaveLength(2);
    expect(project).not.toContain(newProject3);
  });
});
