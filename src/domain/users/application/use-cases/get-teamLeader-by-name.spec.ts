import { GetTeamLeaderByName } from "./get-teamLeader-by-name";
import { InMemoryTeamLeaderRepository } from "test/repositories/in-memory-teamLeader-repository";
import { makeTeamLeader } from "test/factories/make-teamLeader";

let inMemoryTeamLeaderRepository: InMemoryTeamLeaderRepository;
let sut: GetTeamLeaderByName; // system under test

describe("Get TeamLeader By TeamLeader", () => {
  beforeEach(() => {
    inMemoryTeamLeaderRepository = new InMemoryTeamLeaderRepository();
    sut = new GetTeamLeaderByName(inMemoryTeamLeaderRepository);
  });

  it("should be able to get a list of teamleader's of a name", async () => {
    const newTeamLeader1 = makeTeamLeader({
      name: "João da Pamonha?",
    });
    const newTeamLeader2 = makeTeamLeader({
      name: "João da Pimbada",
    });
    const newTeamLeader3 = makeTeamLeader({
      name: "Rafael da Pamonha",
    });

    await inMemoryTeamLeaderRepository.create(newTeamLeader1);
    await inMemoryTeamLeaderRepository.create(newTeamLeader2);
    await inMemoryTeamLeaderRepository.create(newTeamLeader3);

    const result = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.teamleader).toHaveLength(2);
    expect(result.value?.teamleader).not.toContain(newTeamLeader3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newTeamLeader1 = makeTeamLeader({
      name: "João da Pamonha?",
    });
    const newTeamLeader2 = makeTeamLeader({
      name: "João da Pimbada",
    });
    const newTeamLeader3 = makeTeamLeader({
      name: "Rafael da Pamonha",
    });

    await inMemoryTeamLeaderRepository.create(newTeamLeader1);
    await inMemoryTeamLeaderRepository.create(newTeamLeader2);
    await inMemoryTeamLeaderRepository.create(newTeamLeader3);

    const result = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.teamleader).toHaveLength(0);
  });

  it("should be able paginate a list of teamleaders of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryTeamLeaderRepository.create(
        makeTeamLeader({
          name: "João da Pamonha?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.teamleader).toHaveLength(7);
  });
});
