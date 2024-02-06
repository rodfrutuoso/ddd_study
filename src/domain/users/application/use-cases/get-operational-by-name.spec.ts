import { GetOperationalByName } from "./get-operational-by-name";
import { InMemoryOperationalRepository } from "test/repositories/in-memory-operational-repository";
import { makeOperational } from "test/factories/make-operational";

let inMemoryOperationalRepository: InMemoryOperationalRepository;
let sut: GetOperationalByName; // system under test

describe("Get Operational By Operational", () => {
  beforeEach(() => {
    inMemoryOperationalRepository = new InMemoryOperationalRepository();
    sut = new GetOperationalByName(inMemoryOperationalRepository);
  });

  it("should be able to get a list of operational's of a name", async () => {
    const newOperational1 = makeOperational({
      name: "João da Pamonha?",
    });
    const newOperational2 = makeOperational({
      name: "João da Pimbada",
    });
    const newOperational3 = makeOperational({
      name: "Rafael da Pamonha",
    });

    await inMemoryOperationalRepository.create(newOperational1);
    await inMemoryOperationalRepository.create(newOperational2);
    await inMemoryOperationalRepository.create(newOperational3);

    const result = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.operational).toHaveLength(2);
    expect(result.value?.operational).not.toContain(newOperational3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newOperational1 = makeOperational({
      name: "João da Pamonha?",
    });
    const newOperational2 = makeOperational({
      name: "João da Pimbada",
    });
    const newOperational3 = makeOperational({
      name: "Rafael da Pamonha",
    });

    await inMemoryOperationalRepository.create(newOperational1);
    await inMemoryOperationalRepository.create(newOperational2);
    await inMemoryOperationalRepository.create(newOperational3);

    const result = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.operational).toHaveLength(0);
  });

  it("should be able paginate a list of operationals of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryOperationalRepository.create(
        makeOperational({
          name: "João da Pamonha?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.operational).toHaveLength(7);
  });
});
