import { GetScheduleByDate } from "./get-schedule-by-date";
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule-repository";
import { makeSchedule } from "test/factories/make-schedule";
import { faker } from "@faker-js/faker";

let inMemoryShitRepository: InMemoryScheduleRepository;
let sut: GetScheduleByDate; // system under test

describe("Get Schedule By Date", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryScheduleRepository();
    sut = new GetScheduleByDate(inMemoryShitRepository);
  });

  it("should be able to get a list of schedules between two dates", async () => {
    const newSchedule1 = makeSchedule({ date: new Date("2023-11-10") });
    const newSchedule2 = makeSchedule({ date: new Date("2023-11-12") });
    const newSchedule3 = makeSchedule({ date: new Date("2023-11-15") });

    await inMemoryShitRepository.create(newSchedule1);
    await inMemoryShitRepository.create(newSchedule2);
    await inMemoryShitRepository.create(newSchedule3);

    const { schedules } = await sut.execute({
      startDate: new Date("2023-11-12"),
      endDate: new Date("2023-11-15"),
      page: 1,
    });

    expect(schedules).toHaveLength(2);
    expect(schedules).not.toContain(newSchedule1);
    expect(schedules[0].date).toEqual(new Date("2023-11-15"));
  });

  it("should be able to get a empty list of schedules when there is no schedule between the infomed dates ", async () => {
    const newSchedule1 = makeSchedule({ date: new Date("2023-11-10") });
    const newSchedule2 = makeSchedule({ date: new Date("2023-11-12") });
    const newSchedule3 = makeSchedule({ date: new Date("2023-11-15") });

    await inMemoryShitRepository.create(newSchedule1);
    await inMemoryShitRepository.create(newSchedule2);
    await inMemoryShitRepository.create(newSchedule3);

    const { schedules } = await sut.execute({
      startDate: new Date("2023-11-16"),
      endDate: new Date("2023-11-20"),
      page: 1,
    });

    expect(schedules).toHaveLength(0);
  });

  it("should be able paginate a list of schedules between two dates", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryShitRepository.create(
        makeSchedule({
          date: faker.date.between({ from: "2023-11-12", to: "2023-11-15" }),
        })
      );
    }

    const { schedules } = await sut.execute({
      startDate: new Date("2023-11-12"),
      endDate: new Date("2023-11-15"),
      page: 2,
    });

    expect(schedules).toHaveLength(5);
  });
});
