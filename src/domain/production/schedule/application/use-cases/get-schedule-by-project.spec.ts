import { GetScheduleByProject } from "./get-schedule-by-project";
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule-repository";
import { makeSchedule } from "test/factories/make-schedule";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryScheduleRepository;
let sut: GetScheduleByProject; // system under test

describe("Get Schedule By Project", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryScheduleRepository();
    sut = new GetScheduleByProject(inMemoryShitRepository);
  });

  it("should be able to get a list of schedules of a project", async () => {
    const newSchedule1 = makeSchedule({
      projectId: new UniqueEntityId("project id test"),
    });
    const newSchedule2 = makeSchedule({
      projectId: new UniqueEntityId("project id test"),
    });
    const newSchedule3 = makeSchedule({
      projectId: new UniqueEntityId("project id test 2"),
    });

    await inMemoryShitRepository.create(newSchedule1);
    await inMemoryShitRepository.create(newSchedule2);
    await inMemoryShitRepository.create(newSchedule3);

    const { schedules } = await sut.execute({
      projectId: "project id test",
      page: 1,
    });

    expect(schedules).toHaveLength(2);
    expect(schedules).not.toContain(newSchedule3);
    expect(schedules[0].projectId.toString()).toEqual("project id test");
  });

  it("should be able to get a empty list of schedules when there is no schedule of the infomed project", async () => {
    const newSchedule1 = makeSchedule({
      projectId: new UniqueEntityId("project id test"),
    });
    const newSchedule2 = makeSchedule({
      projectId: new UniqueEntityId("project id test"),
    });
    const newSchedule3 = makeSchedule({
      projectId: new UniqueEntityId("project id test 2"),
    });

    await inMemoryShitRepository.create(newSchedule1);
    await inMemoryShitRepository.create(newSchedule2);
    await inMemoryShitRepository.create(newSchedule3);

    const { schedules } = await sut.execute({
      projectId: "project id test 3",
      page: 1,
    });

    expect(schedules).toHaveLength(0);
  });

  it("should be able paginate a list of schedulesof a project", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryShitRepository.create(
        makeSchedule({
          projectId: new UniqueEntityId("project id test"),
        })
      );
    }

    const { schedules } = await sut.execute({
      projectId: "project id test",
      page: 2,
    });

    expect(schedules).toHaveLength(5);
  });
});
