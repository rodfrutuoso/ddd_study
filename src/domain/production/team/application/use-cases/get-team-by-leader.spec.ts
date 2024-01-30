import { GetTeamByLeader } from "./get-team-by-leader";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";
import { makeTeam } from "test/factories/make-team";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { UserNameId } from "@/core/entities/userNameId";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: GetTeamByLeader; // system under test

describe("Get Team By leader", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new GetTeamByLeader(inMemoryTeamRepository);
  });

  it("should be able filter a list of teams by leader", async () => {
    const newTeam1 = makeTeam({
      leaderId: new UserNameId("João da Pilotinha", new UniqueEntityId("JOAO")),
    });
    const newTeam2 = makeTeam({
      leaderId: new UserNameId("João da Pilotinha", new UniqueEntityId("JOAO")),
    });
    const newTeam3 = makeTeam();

    await inMemoryTeamRepository.create(newTeam1);
    await inMemoryTeamRepository.create(newTeam2);
    await inMemoryTeamRepository.create(newTeam3);

    const { teams } = await sut.execute({
      page: 1,
      leaderId: "JOAO",
    });

    expect(teams).toHaveLength(2);
  });

  it("should be able to get a empty list of teams when there is no team of the informed leader", async () => {
    const newTeam1 = makeTeam();
    const newTeam2 = makeTeam();
    const newTeam3 = makeTeam();

    await inMemoryTeamRepository.create(newTeam1);
    await inMemoryTeamRepository.create(newTeam2);
    await inMemoryTeamRepository.create(newTeam3);

    const { teams } = await sut.execute({
      leaderId: "João da Pilotinha",
      page: 1,
    });

    expect(teams).toHaveLength(0);
  });

  it("should be able paginate a list of teams of a leader", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryTeamRepository.create(
        makeTeam({
          leaderId: new UserNameId(
            "João da Pilotinha",
            new UniqueEntityId("JOAO")
          ),
        })
      );
    }
    // console.log(inMemoryTeamRepository.items);

    const { teams } = await sut.execute({
      page: 2,
      leaderId: "JOAO",
    });

    expect(teams).toHaveLength(5);
  });
});
