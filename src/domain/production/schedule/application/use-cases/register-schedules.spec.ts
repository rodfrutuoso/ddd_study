/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterSchedule } from "./register-schedules";
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule-repository";

let inMemoryProjectShitRepository: InMemoryScheduleRepository;
let sut: RegisterSchedule; // system under test

describe("Register a list of schedules", () => {
  beforeEach(() => {
    inMemoryProjectShitRepository = new InMemoryScheduleRepository();
    sut = new RegisterSchedule(inMemoryProjectShitRepository);
  });

  it("should register a list of schedules of an array", async () => {
    const schedules = [
      {
        teamId: "team 1",
        projectId: "project 1",
        date: new Date("2024/01/12"),
      },
      {
        teamId: "team 1",
        projectId: "project 2",
        date: new Date("2024/01/13"),
      },
      {
        teamId: "team 2",
        projectId: "project 1",
        date: new Date("2024/01/14"),
      },
      {
        teamId: "team 1",
        projectId: "project 3",
        date: new Date("2024/01/20"),
      },
    ];

    const result = await sut.execute({ schedules });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.schedule.length).toEqual(4);
    expect(result.value?.schedule[0].teamId.toString()).toEqual("team 1");
    expect(result.value?.schedule[3].projectId.toString()).toEqual("project 3");
  });
});
