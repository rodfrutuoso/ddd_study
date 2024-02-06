import { GetProgrammerByName } from "./get-programmer-by-name";
import { InMemoryProgrammerRepository } from "test/repositories/in-memory-programmer-repository";
import { makeProgrammer } from "test/factories/make-programmer";

let inMemoryProgrammerRepository: InMemoryProgrammerRepository;
let sut: GetProgrammerByName; // system under test

describe("Get Programmer By Programmer", () => {
  beforeEach(() => {
    inMemoryProgrammerRepository = new InMemoryProgrammerRepository();
    sut = new GetProgrammerByName(inMemoryProgrammerRepository);
  });

  it("should be able to get a list of programmer's of a name", async () => {
    const newProgrammer1 = makeProgrammer({
      name: "João da Pamonha?",
    });
    const newProgrammer2 = makeProgrammer({
      name: "João da Pimbada",
    });
    const newProgrammer3 = makeProgrammer({
      name: "Rafael da Pamonha",
    });

    await inMemoryProgrammerRepository.create(newProgrammer1);
    await inMemoryProgrammerRepository.create(newProgrammer2);
    await inMemoryProgrammerRepository.create(newProgrammer3);

    const result = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.programmer).toHaveLength(2);
    expect(result.value?.programmer).not.toContain(newProgrammer3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newProgrammer1 = makeProgrammer({
      name: "João da Pamonha?",
    });
    const newProgrammer2 = makeProgrammer({
      name: "João da Pimbada",
    });
    const newProgrammer3 = makeProgrammer({
      name: "Rafael da Pamonha",
    });

    await inMemoryProgrammerRepository.create(newProgrammer1);
    await inMemoryProgrammerRepository.create(newProgrammer2);
    await inMemoryProgrammerRepository.create(newProgrammer3);

    const result = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.programmer).toHaveLength(0);
  });

  it("should be able paginate a list of programmers of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryProgrammerRepository.create(
        makeProgrammer({
          name: "João da Pamonha?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.programmer).toHaveLength(7);
  });
});
