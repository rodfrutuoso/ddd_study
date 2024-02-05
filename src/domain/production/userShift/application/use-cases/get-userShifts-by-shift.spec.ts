import { GetUserShiftByShift } from "./get-userShifts-by-shift";
import { InMemoryUserShiftRepository } from "test/repositories/in-memory-userShift-repository";
import { makeUserShift } from "test/factories/make-userShift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryUserShiftRepository;
let sut: GetUserShiftByShift; // system under test

describe("Get UserShift By shift", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryUserShiftRepository();
    sut = new GetUserShiftByShift(inMemoryShitRepository);
  });

  it("should be able to get a list of usershifts of a shift", async () => {
    const newUserShift1 = makeUserShift({
      shiftId: new UniqueEntityId("shift1"),
    });
    const newUserShift2 = makeUserShift({
      shiftId: new UniqueEntityId("shift2"),
    });
    const newUserShift3 = makeUserShift({
      shiftId: new UniqueEntityId("shift1"),
    });

    await inMemoryShitRepository.create(newUserShift1);
    await inMemoryShitRepository.create(newUserShift2);
    await inMemoryShitRepository.create(newUserShift3);

    const result = await sut.execute({
      page: 1,
      shiftId: "shift1",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.userShifts).toHaveLength(2);
    expect(result.value?.userShifts).not.toContain(newUserShift2);
  });

  it("should be able to get a empty list of userShifts when there is no shifts with the informed shiftId ", async () => {
    const newUserShift1 = makeUserShift();
    const newUserShift2 = makeUserShift();
    const newUserShift3 = makeUserShift();

    await inMemoryShitRepository.create(newUserShift1);
    await inMemoryShitRepository.create(newUserShift2);
    await inMemoryShitRepository.create(newUserShift3);

    const result = await sut.execute({
      shiftId: "shift1",
      page: 1,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.userShifts).toHaveLength(0);
  });

  it("should be able paginate a list of userShifts of a shift", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryShitRepository.create(
        makeUserShift({
          shiftId: new UniqueEntityId("shift1"),
        })
      );
    }

    const result = await sut.execute({
      shiftId: "shift1",
      page: 2,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.userShifts).toHaveLength(7);
  });
});
