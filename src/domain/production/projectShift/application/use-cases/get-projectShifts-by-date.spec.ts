import { GetProjectShiftByDate } from "./get-projectShifts-by-date";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";
import { makeShift } from "test/factories/make-shift";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";

let inMemoryProjectShiftRepository: InMemoryProjectShiftRepository;
let inMemoryShitfRepository: InMemoryShiftRepository;
let sut: GetProjectShiftByDate; // system under test

describe("Get ProjectShift By date", () => {
  beforeEach(() => {
    inMemoryProjectShiftRepository = new InMemoryProjectShiftRepository();
    inMemoryShitfRepository = new InMemoryShiftRepository();
    sut = new GetProjectShiftByDate(
      inMemoryProjectShiftRepository,
      inMemoryShitfRepository
    );
  });

  it("should be able to get a list of projectshifts by date", async () => {
    const newShift1 = makeShift({ date: new Date("2023-11-10") });
    const newShift2 = makeShift({ date: new Date("2023-11-12") });
    const newShift3 = makeShift({ date: new Date("2023-11-15") });

    await inMemoryShitfRepository.create(newShift1);
    await inMemoryShitfRepository.create(newShift2);
    await inMemoryShitfRepository.create(newShift3);

    const newProjectShift1 = makeProjectShift({
      shiftId: newShift1.id,
    });
    const newProjectShift2 = makeProjectShift({
      shiftId: newShift2.id,
    });
    const newProjectShift3 = makeProjectShift({
      shiftId: newShift3.id,
    });

    await inMemoryProjectShiftRepository.create(newProjectShift1);
    await inMemoryProjectShiftRepository.create(newProjectShift2);
    await inMemoryProjectShiftRepository.create(newProjectShift3);

    const result = await sut.execute({
      startDate: new Date("2023-11-12"),
      endDate: new Date("2023-11-15"),
      page: 1,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.projectShifts).toHaveLength(2);
    expect(result.value?.projectShifts).not.toContain(newProjectShift1);
  });

  it("should be able to get a empty list of projectShifts when there is no shifts between informed dates ", async () => {
    const newShift1 = makeShift({ date: new Date("2023-11-10") });
    const newShift2 = makeShift({ date: new Date("2023-11-12") });
    const newShift3 = makeShift({ date: new Date("2023-11-15") });

    await inMemoryShitfRepository.create(newShift1);
    await inMemoryShitfRepository.create(newShift2);
    await inMemoryShitfRepository.create(newShift3);

    const newProjectShift1 = makeProjectShift({
      shiftId: newShift1.id,
    });
    const newProjectShift2 = makeProjectShift({
      shiftId: newShift2.id,
    });
    const newProjectShift3 = makeProjectShift({
      shiftId: newShift3.id,
    });

    await inMemoryProjectShiftRepository.create(newProjectShift1);
    await inMemoryProjectShiftRepository.create(newProjectShift2);
    await inMemoryProjectShiftRepository.create(newProjectShift3);

    const result = await sut.execute({
      startDate: new Date("2023-11-16"),
      endDate: new Date("2023-11-25"),
      page: 1,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.projectShifts).toHaveLength(0);
  });

  it("should be able paginate a list of projectShifts fo a project", async () => {
    for (let i = 1; i <= 57; i++) {
      const ShiftFor = makeShift({
        date: new Date("2023-11-10"),
      });
      await inMemoryShitfRepository.create(ShiftFor);

      await inMemoryProjectShiftRepository.create(
        makeProjectShift({
          shiftId: ShiftFor.id,
        })
      );
    }

    const result = await sut.execute({
      startDate: new Date("2023-11-09"),
      endDate: new Date("2023-11-11"),
      page: 2,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.projectShifts).toHaveLength(7);
  });
});
