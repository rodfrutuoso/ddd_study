import { GetScheduleByTeam } from "./get-schedule-by-team";
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule-repository";
import { makeSchedule } from "test/factories/make-schedule";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryScheduleRepository;
let sut: GetScheduleByTeam; // system under test

describe("Get Schedule By Team", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryScheduleRepository();
    sut = new GetScheduleByTeam(inMemoryShitRepository);
  });

  it("should be able to get a list of schedules of a team", async () => {
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

    const result = await sut.execute({
      teamId: "team id test",
      page: 1,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.schedules).toHaveLength(2);
    expect(result.value?.schedules).not.toContain(newSchedule3);
    expect(result.value?.schedules[0].teamId.toString()).toEqual(
      "team id test"
    );
  });

  it("should be able to get a empty list of schedules when there is no schedule of the infomed team ", async () => {
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

    const result = await sut.execute({
      teamId: "team id test 3",
      page: 1,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.schedules).toHaveLength(0);
  });

  it("should be able paginate a list of schedules of a team", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryShitRepository.create(
        makeSchedule({
          teamId: new UniqueEntityId("team id test"),
        })
      );
    }

    const result = await sut.execute({
      teamId: "team id test",
      page: 2,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.schedules).toHaveLength(5);
  });
});
