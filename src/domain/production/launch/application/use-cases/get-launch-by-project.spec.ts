import { GetLaunchByProject } from "./get-launch-by-project";
import { InMemoryLaunchRepository } from "test/repositories/in-memory-launch-repository";
import { makeLaunch } from "test/factories/make-launch";
import { makeProject } from "test/factories/make-project";
import { InMemoryProjectRepository } from "test/repositories/in-memory-project-repository";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";

let inMemoryLaunchRepository: InMemoryLaunchRepository;
let inMemoryProjectRepository: InMemoryProjectRepository;
let inMemoryProjectShiftRepository: InMemoryProjectShiftRepository;
let sut: GetLaunchByProject; // system under test

describe("Get Launch By Project", () => {
  beforeEach(() => {
    inMemoryLaunchRepository = new InMemoryLaunchRepository();
    inMemoryProjectRepository = new InMemoryProjectRepository();
    inMemoryProjectShiftRepository = new InMemoryProjectShiftRepository();
    sut = new GetLaunchByProject(
      inMemoryLaunchRepository,
      inMemoryProjectRepository,
      inMemoryProjectShiftRepository
    );
  });

  it("should be able filter a list of launchs of a projectCode", async () => {
    const project1 = makeProject({ projectCode: "B-12345678" });
    const project2 = makeProject({ projectCode: "B-12345678" });
    const project3 = makeProject();

    await inMemoryProjectRepository.create(project1);
    await inMemoryProjectRepository.create(project2);
    await inMemoryProjectRepository.create(project3);

    const projectShift1 = makeProjectShift({ projectId: project1.id });
    const projectShift2 = makeProjectShift({ projectId: project2.id });
    const projectShift3 = makeProjectShift({ projectId: project3.id });

    await inMemoryProjectShiftRepository.create(projectShift1);
    await inMemoryProjectShiftRepository.create(projectShift2);
    await inMemoryProjectShiftRepository.create(projectShift3);

    const newLaunch1 = makeLaunch({
      projectShiftId: projectShift1.id,
    });
    const newLaunch2 = makeLaunch({
      projectShiftId: projectShift2.id,
    });
    const newLaunch3 = makeLaunch({
      projectShiftId: projectShift3.id,
    });

    await inMemoryLaunchRepository.create(newLaunch1);
    await inMemoryLaunchRepository.create(newLaunch2);
    await inMemoryLaunchRepository.create(newLaunch3);

    const result = await sut.execute({
      page: 1,
      projectCode: "B-12345678",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.launchs).toHaveLength(2);
  });

  it("should be able to get a empty list of launchs when there is no launch of the informed projectCode", async () => {
    const project1 = makeProject();
    const project2 = makeProject();
    const project3 = makeProject();

    await inMemoryProjectRepository.create(project1);
    await inMemoryProjectRepository.create(project2);
    await inMemoryProjectRepository.create(project3);

    const projectShift1 = makeProjectShift({ projectId: project1.id });
    const projectShift2 = makeProjectShift({ projectId: project2.id });
    const projectShift3 = makeProjectShift({ projectId: project3.id });

    await inMemoryProjectShiftRepository.create(projectShift1);
    await inMemoryProjectShiftRepository.create(projectShift2);
    await inMemoryProjectShiftRepository.create(projectShift3);

    const newLaunch1 = makeLaunch({
      projectShiftId: projectShift1.id,
    });
    const newLaunch2 = makeLaunch({
      projectShiftId: projectShift2.id,
    });
    const newLaunch3 = makeLaunch({
      projectShiftId: projectShift3.id,
    });

    await inMemoryLaunchRepository.create(newLaunch1);
    await inMemoryLaunchRepository.create(newLaunch2);
    await inMemoryLaunchRepository.create(newLaunch3);

    const result = await sut.execute({
      page: 1,
      projectCode: "B-12345678",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.launchs).toHaveLength(0);
  });

  it("should be able paginate a list of launchs of a projectCode", async () => {
    for (let i = 1; i <= 55; i++) {
      const projectFor = makeProject({
        projectCode: "B-12345678",
      });
      await inMemoryProjectRepository.create(projectFor);

      const projectShiftFor = makeProjectShift({ projectId: projectFor.id });

      await inMemoryProjectShiftRepository.create(projectShiftFor);

      await inMemoryLaunchRepository.create(
        makeLaunch({
          projectShiftId: projectShiftFor.id,
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      projectCode: "B-12345678",
    });

    expect(result.isRight()).toBe(true);
    expect(result.value?.launchs).toHaveLength(5);
  });
});
