import { GetLaunchByService } from "./get-launch-by-service";
import { InMemoryLaunchRepository } from "test/repositories/in-memory-launch-repository";
import { makeLaunch } from "test/factories/make-launch";
import { makeService } from "test/factories/make-service";
import { InMemoryServiceRepository } from "test/repositories/in-memory-service-repository";

let inMemoryLaunchRepository: InMemoryLaunchRepository;
let inMemoryServiceRepository: InMemoryServiceRepository;
let sut: GetLaunchByService; // system under test

describe("Get Launch By Service", () => {
  beforeEach(() => {
    inMemoryLaunchRepository = new InMemoryLaunchRepository();
    inMemoryServiceRepository = new InMemoryServiceRepository();
    sut = new GetLaunchByService(
      inMemoryLaunchRepository,
      inMemoryServiceRepository
    );
  });

  it("should be able filter a list of launchs of a code", async () => {
    const service1 = makeService({
      code: "SDMU0125",
    });
    const service2 = makeService({
      code: "SDMU0125",
    });
    const service3 = makeService();

    await inMemoryServiceRepository.create(service1);
    await inMemoryServiceRepository.create(service2);
    await inMemoryServiceRepository.create(service3);

    const newLaunch1 = makeLaunch({
      serviceId: service1.id,
    });
    const newLaunch2 = makeLaunch({
      serviceId: service2.id,
    });
    const newLaunch3 = makeLaunch({
      serviceId: service3.id,
    });

    await inMemoryLaunchRepository.create(newLaunch1);
    await inMemoryLaunchRepository.create(newLaunch2);
    await inMemoryLaunchRepository.create(newLaunch3);

    const { launchs } = await sut.execute({
      page: 1,
      code: "SDMU0125",
    });

    expect(launchs).toHaveLength(2);
  });

  it("should be able to get a empty list of launchs when there is no launch of the informed code", async () => {
    const service1 = makeService();
    const service2 = makeService();
    const service3 = makeService();

    await inMemoryServiceRepository.create(service1);
    await inMemoryServiceRepository.create(service2);
    await inMemoryServiceRepository.create(service3);

    const newLaunch1 = makeLaunch({
      serviceId: service1.id,
    });
    const newLaunch2 = makeLaunch({
      serviceId: service2.id,
    });
    const newLaunch3 = makeLaunch({
      serviceId: service3.id,
    });

    await inMemoryLaunchRepository.create(newLaunch1);
    await inMemoryLaunchRepository.create(newLaunch2);
    await inMemoryLaunchRepository.create(newLaunch3);

    const { launchs } = await sut.execute({
      page: 1,
      code: "SDMU0125",
    });

    expect(launchs).toHaveLength(0);
  });

  it("should be able paginate a list of launchs of a code", async () => {
    for (let i = 1; i <= 55; i++) {
      const serviceFor = makeService({
        code: "SDMU0125",
      });
      await inMemoryServiceRepository.create(serviceFor);

      await inMemoryLaunchRepository.create(
        makeLaunch({
          serviceId: serviceFor.id,
        })
      );
    }

    const { launchs } = await sut.execute({
      page: 2,
      code: "SDMU0125",
    });

    expect(launchs).toHaveLength(5);
  });
});
