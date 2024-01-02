import { GetServiceByCode } from "./get-service-by-code";
import { InMemoryServiceRepository } from "test/repositories/in-memory-service-repository";
import { makeService } from "test/factories/make-service";

let inMemoryServiceRepository: InMemoryServiceRepository;
let sut: GetServiceByCode; // system under test

describe("Get Service By code", () => {
  beforeEach(() => {
    inMemoryServiceRepository = new InMemoryServiceRepository();
    sut = new GetServiceByCode(inMemoryServiceRepository);
  });

  it("should be able filter a list of services by code", async () => {
    const newService1 = makeService({
      code: "SDMU0024",
    });
    const newService2 = makeService({
      code: "SDMU0024",
    });
    const newService3 = makeService();

    await inMemoryServiceRepository.create(newService1);
    await inMemoryServiceRepository.create(newService2);
    await inMemoryServiceRepository.create(newService3);

    const { services } = await sut.execute({
      page: 1,
      code: "SDMU0024",
    });

    expect(services).toHaveLength(2);
  });

  it("should be able to get a empty list of services when there is no service of the informed code", async () => {
    const newService1 = makeService();
    const newService2 = makeService();
    const newService3 = makeService();

    await inMemoryServiceRepository.create(newService1);
    await inMemoryServiceRepository.create(newService2);
    await inMemoryServiceRepository.create(newService3);

    const { services } = await sut.execute({
      code: "SDMU0024",
      page: 1,
    });

    expect(services).toHaveLength(0);
  });

  it("should be able paginate a list of services of a service", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryServiceRepository.create(
        makeService({
          code: "SDMU0024",
        })
      );
    }
    // console.log(inMemoryServiceRepository.items);

    const { services } = await sut.execute({
      page: 2,
      code: "SDMU0024",
    });

    expect(services).toHaveLength(5);
  });

  it("should be able to get a list of services of a parcial code informed", async () => {
    const newService1 = makeService({
      code: "SDMU0024",
    });
    const newService2 = makeService({
      code: "SDMU0024",
    });
    const newService3 = makeService();

    await inMemoryServiceRepository.create(newService1);
    await inMemoryServiceRepository.create(newService2);
    await inMemoryServiceRepository.create(newService3);

    const { services } = await sut.execute({
      page: 1,
      code: "SDMU",
    });

    expect(services).toHaveLength(2);
  });
});
