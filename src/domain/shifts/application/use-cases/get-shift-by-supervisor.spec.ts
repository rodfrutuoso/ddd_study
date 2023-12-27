import { GetShiftBySupervisor } from "./get-shift-by-supervisor";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { makeTeam } from "test/factories/make-team";
import { InMemoryTeamRepository } from "test/repositories/in-memory-team-repository";

let inMemoryShitRepository: InMemoryShiftRepository;
let inMemoryTeamRepository: InMemoryTeamRepository;
let sut: GetShiftBySupervisor; // system under test

describe("Get Shift By supervisor", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    inMemoryTeamRepository = new InMemoryTeamRepository();
    sut = new GetShiftBySupervisor(
      inMemoryShitRepository,
      inMemoryTeamRepository
    );
  });

  it("should be able filter a list of shifts of a supervisor", async () => {
    const team1 = makeTeam({
      supervisorId: new UniqueEntityId("supervisor 1"),
    });
    const team2 = makeTeam({
      supervisorId: new UniqueEntityId("supervisor 1"),
    });
    const team3 = makeTeam();

    await inMemoryTeamRepository.create(team1);
    await inMemoryTeamRepository.create(team2);
    await inMemoryTeamRepository.create(team3);

    const newShift1 = makeShift({
      teamId: team1.id,
    });
    const newShift2 = makeShift({
      teamId: team2.id,
    });
    const newShift3 = makeShift({ teamId: team3.id });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const { shifts } = await sut.execute({
      page: 1,
      supervisorId: "supervisor 1",
    });

    expect(shifts).toHaveLength(2);
  });

  //   it("should be able to get a empty list of shifts when there is no shift of the informed team", async () => {
  //     const newShift1 = makeShift({ teamId: new UniqueEntityId("123-456-xyz") });
  //     const newShift2 = makeShift({ teamId: new UniqueEntityId("123-456-xyz") });
  //     const newShift3 = makeShift({ teamId: new UniqueEntityId("123-456-xyz") });

  //     await inMemoryShitRepository.create(newShift1);
  //     await inMemoryShitRepository.create(newShift2);
  //     await inMemoryShitRepository.create(newShift3);

  //     const { shifts } = await sut.execute({
  //       page: 1,
  //       teamId: "123-456-xyz-diferente",
  //     });

  //     expect(shifts).toHaveLength(0);
  //   });

  //   it("should be able paginate a list of shifts of a team", async () => {
  //     for (let i = 1; i <= 55; i++) {
  //       await inMemoryShitRepository.create(
  //         makeShift({
  //           teamId: new UniqueEntityId("123-456-xyz"),
  //         })
  //       );
  //     }

  //     const { shifts } = await sut.execute({
  //       page: 2,
  //       teamId: "123-456-xyz",
  //     });

  //     expect(shifts).toHaveLength(5);
  //   });
});
