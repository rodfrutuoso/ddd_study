/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteSchedule } from "./delete-schedule";
import { InMemoryScheduleRepository } from "test/repositories/in-memory-schedule-repository";
import { makeSchedule } from "test/factories/make-schedule";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

let inMemoryShitRepository: InMemoryScheduleRepository;
let sut: DeleteSchedule; // system under test

describe("Delete Schedule By Id", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryScheduleRepository();
    sut = new DeleteSchedule(inMemoryShitRepository);
  });

  it("should be albe to delete a schedule by its id", async () => {
    const newSchedule = await makeSchedule(
      {},
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryShitRepository.create(newSchedule);

    const result = await sut.execute({
      scheduleId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryShitRepository.findById("abc-123-xyz")).toBeNull();
    expect(await inMemoryShitRepository.items).toHaveLength(0);
  });

  it("should be albe to delete all schedules", async () => {
    const newSchedule = await makeSchedule(
      {},
      new UniqueEntityId("abc-123-xyz")
    );

    const newSchedule2 = await makeSchedule(
      {},
      new UniqueEntityId("abc-123-xyz-123")
    );

    await inMemoryShitRepository.create(newSchedule);
    await inMemoryShitRepository.create(newSchedule2);

    const result = await sut.execute({
      programmerType: "ADM",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryShitRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a schedule by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newSchedule = await makeSchedule(
      {},
      new UniqueEntityId("abc-123-xyz")
    );

    await inMemoryShitRepository.create(newSchedule);

    const result = await sut.execute({
      scheduleId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).instanceOf(NotAuthorizedError);
    expect(await inMemoryShitRepository.findById("abc-123-xyz")).toBeTruthy();
    expect(await inMemoryShitRepository.items).toHaveLength(1);
  });
});
