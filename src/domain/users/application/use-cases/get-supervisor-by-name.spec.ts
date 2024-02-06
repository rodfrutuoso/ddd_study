import { GetSupervisorByName } from "./get-supervisor-by-name";
import { InMemorySupervisorRepository } from "test/repositories/in-memory-supervisor-repository";
import { makeSupervisor } from "test/factories/make-supervisor";

let inMemorySupervisorRepository: InMemorySupervisorRepository;
let sut: GetSupervisorByName; // system under test

describe("Get Supervisor By Supervisor", () => {
  beforeEach(() => {
    inMemorySupervisorRepository = new InMemorySupervisorRepository();
    sut = new GetSupervisorByName(inMemorySupervisorRepository);
  });

  it("should be able to get a list of supervisor's of a name", async () => {
    const newSupervisor1 = makeSupervisor({
      name: "João da Pamonha?",
    });
    const newSupervisor2 = makeSupervisor({
      name: "João da Pimbada",
    });
    const newSupervisor3 = makeSupervisor({
      name: "Rafael da Pamonha",
    });

    await inMemorySupervisorRepository.create(newSupervisor1);
    await inMemorySupervisorRepository.create(newSupervisor2);
    await inMemorySupervisorRepository.create(newSupervisor3);

    const result = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.supervisor).toHaveLength(2);
    expect(result.value?.supervisor).not.toContain(newSupervisor3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newSupervisor1 = makeSupervisor({
      name: "João da Pamonha?",
    });
    const newSupervisor2 = makeSupervisor({
      name: "João da Pimbada",
    });
    const newSupervisor3 = makeSupervisor({
      name: "Rafael da Pamonha",
    });

    await inMemorySupervisorRepository.create(newSupervisor1);
    await inMemorySupervisorRepository.create(newSupervisor2);
    await inMemorySupervisorRepository.create(newSupervisor3);

    const result = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.supervisor).toHaveLength(0);
  });

  it("should be able paginate a list of supervisors of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemorySupervisorRepository.create(
        makeSupervisor({
          name: "João da Pamonha?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.supervisor).toHaveLength(7);
  });
});
