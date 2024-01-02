import { GetProjectShiftByProject } from "./get-projectShifts-by-project";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryProjectShiftRepository;
let sut: GetProjectShiftByProject; // system under test

describe("Get ProjectShift By Project", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryProjectShiftRepository();
    sut = new GetProjectShiftByProject(inMemoryShitRepository);
  });

  it("should be able to get a list of projectshifts of a project", async () => {
    const newProjectShift1 = makeProjectShift({
      projectId: new UniqueEntityId("project1"),
    });
    const newProjectShift2 = makeProjectShift({
      projectId: new UniqueEntityId("project2"),
    });
    const newProjectShift3 = makeProjectShift({
      projectId: new UniqueEntityId("project1"),
    });

    await inMemoryShitRepository.create(newProjectShift1);
    await inMemoryShitRepository.create(newProjectShift2);
    await inMemoryShitRepository.create(newProjectShift3);

    const { projectShifts } = await sut.execute({
      projectId: "project1",
      page: 1,
    });

    expect(projectShifts).toHaveLength(2);
    expect(projectShifts).not.toContain(newProjectShift2);
  });

  it("should be able to get a empty list of projectShifts when there is no shifts with the informed projectId ", async () => {
    const newProjectShift1 = makeProjectShift();
    const newProjectShift2 = makeProjectShift();
    const newProjectShift3 = makeProjectShift();

    await inMemoryShitRepository.create(newProjectShift1);
    await inMemoryShitRepository.create(newProjectShift2);
    await inMemoryShitRepository.create(newProjectShift3);

    const { projectShifts } = await sut.execute({
      projectId: "project1",
      page: 1,
    });

    expect(projectShifts).toHaveLength(0);
  });

  it("should be able paginate a list of projectShifts fo a project", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryShitRepository.create(
        makeProjectShift({
          projectId: new UniqueEntityId("project1"),
        })
      );
    }

    const { projectShifts } = await sut.execute({
      projectId: "project1",
      page: 2,
    });

    expect(projectShifts).toHaveLength(7);
  });
});
