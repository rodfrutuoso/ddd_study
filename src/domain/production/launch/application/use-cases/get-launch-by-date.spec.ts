import { GetLaunchByDate } from "./get-launch-by-date";
import { InMemoryLaunchRepository } from "test/repositories/in-memory-launch-repository";
import { makeLaunch } from "test/factories/make-launch";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { InMemoryProjectShiftRepository } from "test/repositories/in-memory-projectShift-repository";
import { makeProjectShift } from "test/factories/make-projectShift";
import { makeShift } from "test/factories/make-shift";

let inMemoryLaunchRepository: InMemoryLaunchRepository;
let inMemoryShiftRepository: InMemoryShiftRepository;
let inMemoryProjectShiftRepository: InMemoryProjectShiftRepository;
let sut: GetLaunchByDate; // system under test

describe("Get Launch By Project", () => {
  beforeEach(() => {
    inMemoryLaunchRepository = new InMemoryLaunchRepository();
    inMemoryShiftRepository = new InMemoryShiftRepository();
    inMemoryProjectShiftRepository = new InMemoryProjectShiftRepository();
    sut = new GetLaunchByDate(
      inMemoryLaunchRepository,
      inMemoryShiftRepository,
      inMemoryProjectShiftRepository
    );
  });

  it("should be able filter a list of launchs of a projectCode", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-10") });
    const shift2 = makeShift({ date: new Date("2023-12-12") });
    const shift3 = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift1);
    await inMemoryShiftRepository.create(shift2);
    await inMemoryShiftRepository.create(shift3);

    const projectShift1 = makeProjectShift({ projectId: shift1.id });
    const projectShift2 = makeProjectShift({ projectId: shift2.id });
    const projectShift3 = makeProjectShift({ projectId: shift3.id });

    await inMemoryProjectShiftRepository.create(projectShift1);
    await inMemoryProjectShiftRepository.create(projectShift2);
    await inMemoryProjectShiftRepository.create(projectShift3);

    const newLaunch1 = makeLaunch({
      projectShiftId: projectShift1.id,
    });
    const newLaunch2 = makeLaunch({
      projectShiftId: projectShift2.id,
    });
    const newLaunch3 = makeLaunch({
      projectShiftId: projectShift3.id,
    });

    await inMemoryLaunchRepository.create(newLaunch1);
    await inMemoryLaunchRepository.create(newLaunch2);
    await inMemoryLaunchRepository.create(newLaunch3);

    const { launchs } = await sut.execute({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-15"),
      page: 1,
    });

    expect(launchs).toHaveLength(2);
  });

  it("should be able to get a empty list of launchs when there is no launch of the informed projectCode", async () => {
    const shift1 = makeShift();
    const shift2 = makeShift();
    const shift3 = makeShift();

    await inMemoryShiftRepository.create(shift1);
    await inMemoryShiftRepository.create(shift2);
    await inMemoryShiftRepository.create(shift3);

    const projectShift1 = makeProjectShift({ projectId: shift1.id });
    const projectShift2 = makeProjectShift({ projectId: shift2.id });
    const projectShift3 = makeProjectShift({ projectId: shift3.id });

    await inMemoryProjectShiftRepository.create(projectShift1);
    await inMemoryProjectShiftRepository.create(projectShift2);
    await inMemoryProjectShiftRepository.create(projectShift3);

    const newLaunch1 = makeLaunch({
      projectShiftId: projectShift1.id,
    });
    const newLaunch2 = makeLaunch({
      projectShiftId: projectShift2.id,
    });
    const newLaunch3 = makeLaunch({
      projectShiftId: projectShift3.id,
    });

    await inMemoryLaunchRepository.create(newLaunch1);
    await inMemoryLaunchRepository.create(newLaunch2);
    await inMemoryLaunchRepository.create(newLaunch3);

    const { launchs } = await sut.execute({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-15"),
      page: 1,
    });

    expect(launchs).toHaveLength(0);
  });

  it("should be able paginate a list of launchs of a projectCode", async () => {
    for (let i = 1; i <= 55; i++) {
      const projectFor = makeShift({
        date: new Date("2023-12-12"),
      });
      await inMemoryShiftRepository.create(projectFor);

      const projectShiftFor = makeProjectShift({ projectId: projectFor.id });

      await inMemoryProjectShiftRepository.create(projectShiftFor);

      await inMemoryLaunchRepository.create(
        makeLaunch({
          projectShiftId: projectShiftFor.id,
        })
      );
    }

    const { launchs } = await sut.execute({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-15"),
      page: 2,
    });

    expect(launchs).toHaveLength(5);
  });
});
