import { GetTeamBySupervisor } from "./get-team-by-supervisor";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";
import { makeTeam } from "test/factories/make-team";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { UserNameId } from "@/core/entities/userNameId";

let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: GetTeamBySupervisor; // system under test

describe("Get Team By supervisor", () => {
  beforeEach(() => {
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new GetTeamBySupervisor(inMemoryTeamRepository);
  });

  it("should be able filter a list of teams by supervisor", async () => {
    const newTeam1 = makeTeam({
      supervisorId: new UserNameId(
        "Nome Supervisor",
        new UniqueEntityId("ECOLM001")
      ),
    });
    const newTeam2 = makeTeam({
      supervisorId: new UserNameId(
        "Nome Supervisor",
        new UniqueEntityId("ECOLM001")
      ),
    });
    const newTeam3 = makeTeam();

    await inMemoryTeamRepository.create(newTeam1);
    await inMemoryTeamRepository.create(newTeam2);
    await inMemoryTeamRepository.create(newTeam3);

    const { teams } = await sut.execute({
      page: 1,
      supervisorId: "ECOLM001",
    });

    expect(teams).toHaveLength(2);
  });

  it("should be able to get a empty list of teams when there is no team of the informed supervisor", async () => {
    const newTeam1 = makeTeam();
    const newTeam2 = makeTeam();
    const newTeam3 = makeTeam();

    await inMemoryTeamRepository.create(newTeam1);
    await inMemoryTeamRepository.create(newTeam2);
    await inMemoryTeamRepository.create(newTeam3);

    const { teams } = await sut.execute({
      supervisorId: "ECOLM001",
      page: 1,
    });

    expect(teams).toHaveLength(0);
  });

  it("should be able paginate a list of teams of a team", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryTeamRepository.create(
        makeTeam({
          supervisorId: new UserNameId(
            "JOAO NUM SEI DAS QUANTAS",
            new UniqueEntityId("ECOLM001")
          ),
        })
      );
    }
    // console.log(inMemoryTeamRepository.items);

    const { teams } = await sut.execute({
      page: 2,
      supervisorId: "ECOLM001",
    });

    expect(teams).toHaveLength(5);
  });
});
