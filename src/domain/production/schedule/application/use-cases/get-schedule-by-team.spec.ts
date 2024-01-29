import { GetScheduleByTeam } from "./get-schedule-by-team";
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule-repository";
import { makeSchedule } from "test/factories/make-schedule";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryScheduleRepository;
let sut: GetScheduleByTeam; // system under test

describe("Get Schedule By Date", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryScheduleRepository();
    sut = new GetScheduleByTeam(inMemoryShitRepository);
  });

  it("should be able to get a list of schedules between two dates", async () => {
    const newSchedule1 = makeSchedule({
      teamId: new UniqueEntityId("team id test"),
    });
    const newSchedule2 = makeSchedule({
      teamId: new UniqueEntityId("team id test"),
    });
    const newSchedule3 = makeSchedule({
      teamId: new UniqueEntityId("team id test 2"),
    });

    await inMemoryShitRepository.create(newSchedule1);
    await inMemoryShitRepository.create(newSchedule2);
    await inMemoryShitRepository.create(newSchedule3);

    const { schedules } = await sut.execute({
      teamId: "team id test",
      page: 1,
    });

    expect(schedules).toHaveLength(2);
    expect(schedules).not.toContain(newSchedule3);
    expect(schedules[0].teamId.toString()).toEqual("team id test");
  });

  it("should be able to get a empty list of schedules when there is no schedule between the infomed dates ", async () => {
    const newSchedule1 = makeSchedule({
      teamId: new UniqueEntityId("team id test"),
    });
    const newSchedule2 = makeSchedule({
      teamId: new UniqueEntityId("team id test"),
    });
    const newSchedule3 = makeSchedule({
      teamId: new UniqueEntityId("team id test 2"),
    });

    await inMemoryShitRepository.create(newSchedule1);
    await inMemoryShitRepository.create(newSchedule2);
    await inMemoryShitRepository.create(newSchedule3);

    const { schedules } = await sut.execute({
      teamId: "team id test 3",
      page: 1,
    });

    expect(schedules).toHaveLength(0);
  });

  it("should be able paginate a list of schedules between two dates", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryShitRepository.create(
        makeSchedule({
          teamId: new UniqueEntityId("team id test"),
        })
      );
    }

    const { schedules } = await sut.execute({
      teamId: "team id test",
      page: 2,
    });

    expect(schedules).toHaveLength(5);
  });
});
