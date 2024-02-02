import { GetShiftByContract } from "./get-shift-by-contract";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { makeTeam } from "test/factories/make-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";

let inMemoryShitRepository: InMemoryShiftRepository;
let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: GetShiftByContract; // system under test

describe("Get Shift By contract", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new GetShiftByContract(
      inMemoryShitRepository,
      inMemoryTeamRepository
    );
  });

  it("should be able filter a list of shifts of a contract", async () => {
    const team1 = makeTeam({ contract: "Coelba" });
    const team2 = makeTeam({ contract: "Coelba" });
    const team3 = makeTeam();

    await inMemoryTeamRepository.create(team1);
    await inMemoryTeamRepository.create(team2);
    await inMemoryTeamRepository.create(team3);

    const newShift1 = makeShift({ teamId: team1.id });
    const newShift2 = makeShift({ teamId: team2.id });
    const newShift3 = makeShift({ teamId: team3.id });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const result = await sut.execute({
      page: 1,
      contract: "Coelba",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.shifts).toHaveLength(2);
  });

  it("should be able to get a empty list of shifts when there is no shift of the informed contract", async () => {
    const team1 = makeTeam({
      contract: "Coelba",
    });
    const team2 = makeTeam({
      contract: "Coelba",
    });
    const team3 = makeTeam({
      contract: "Coelba",
    });

    await inMemoryTeamRepository.create(team1);
    await inMemoryTeamRepository.create(team2);
    await inMemoryTeamRepository.create(team3);

    const newShift1 = makeShift({
      teamId: team1.id,
    });
    const newShift2 = makeShift({
      teamId: team2.id,
    });
    const newShift3 = makeShift({
      teamId: team3.id,
    });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const result = await sut.execute({
      page: 1,
      contract: "Celpe",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.shifts).toHaveLength(0);
  });

  it("should be able paginate a list of shifts of a contract", async () => {
    for (let i = 1; i <= 55; i++) {
      const teamFor = makeTeam({
        contract: "Coelba",
      });
      await inMemoryTeamRepository.create(teamFor);

      await inMemoryShitRepository.create(
        makeShift({
          teamId: teamFor.id,
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      contract: "Coelba",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.shifts).toHaveLength(5);
  });
});
