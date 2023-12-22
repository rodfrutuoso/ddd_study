import { GetProjectShiftByShift } from "./get-projectShifts-by-shift";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryProjectShiftRepository;
let sut: GetProjectShiftByShift; // system under test

describe("Get ProjectShift By Date", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryProjectShiftRepository();
    sut = new GetProjectShiftByShift(inMemoryShitRepository);
  });

  it("should be able to get a list of projectshifts of a shift", async () => {
    const newProjectShift1 = makeProjectShift({
      shiftId: new UniqueEntityId("shift1"),
    });
    const newProjectShift2 = makeProjectShift({
      shiftId: new UniqueEntityId("shift2"),
    });
    const newProjectShift3 = makeProjectShift({
      shiftId: new UniqueEntityId("shift1"),
    });

    await inMemoryShitRepository.create(newProjectShift1);
    await inMemoryShitRepository.create(newProjectShift2);
    await inMemoryShitRepository.create(newProjectShift3);

    const { projectShifts } = await sut.execute({
      shiftId: "shift1",
      page: 1,
    });

    expect(projectShifts).toHaveLength(2);
    expect(projectShifts).not.toContain(newProjectShift2);
  });

  it("should be able to get a empty list of projectShifts when there is no shifts with the informed shiftId ", async () => {
    const newProjectShift1 = makeProjectShift();
    const newProjectShift2 = makeProjectShift();
    const newProjectShift3 = makeProjectShift();

    await inMemoryShitRepository.create(newProjectShift1);
    await inMemoryShitRepository.create(newProjectShift2);
    await inMemoryShitRepository.create(newProjectShift3);

    const { projectShifts } = await sut.execute({
      shiftId: "shift1",
      page: 1,
    });

    expect(projectShifts).toHaveLength(0);
  });

  it("should be able paginate a list of projectShifts between two dates", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryShitRepository.create(
        makeProjectShift({
          shiftId: new UniqueEntityId("shift1"),
        }),
      );
    }

    const { projectShifts } = await sut.execute({
      shiftId: "shift1",
      page: 2,
    });

    expect(projectShifts).toHaveLength(7);
  });
});
