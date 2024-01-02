import { GetShiftByTeam } from "./get-shift-by-team";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryShiftRepository;
let sut: GetShiftByTeam; // system under test

describe("Get Shift By team", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryShiftRepository();
    sut = new GetShiftByTeam(inMemoryShitRepository);
  });

  it("should be able filter a list of shifts of a team", async () => {
    const newShift1 = makeShift({
      teamId: new UniqueEntityId("1-546"),
    });
    const newShift2 = makeShift({
      teamId: new UniqueEntityId("1-546"),
    });
    const newShift3 = makeShift();

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const { shifts } = await sut.execute({
      page: 1,
      teamId: "1-546",
    });

    expect(shifts).toHaveLength(2);
  });

  it("should be able to get a empty list of shifts when there is no shift of the informed team", async () => {
    const newShift1 = makeShift({ teamId: new UniqueEntityId("123-456-xyz") });
    const newShift2 = makeShift({ teamId: new UniqueEntityId("123-456-xyz") });
    const newShift3 = makeShift({ teamId: new UniqueEntityId("123-456-xyz") });

    await inMemoryShitRepository.create(newShift1);
    await inMemoryShitRepository.create(newShift2);
    await inMemoryShitRepository.create(newShift3);

    const { shifts } = await sut.execute({
      page: 1,
      teamId: "123-456-xyz-diferente",
    });

    expect(shifts).toHaveLength(0);
  });

  it("should be able paginate a list of shifts of a team", async () => {
    for (let i = 1; i <= 55; i++) {
      await inMemoryShitRepository.create(
        makeShift({
          teamId: new UniqueEntityId("123-456-xyz"),
        })
      );
    }

    const { shifts } = await sut.execute({
      page: 2,
      teamId: "123-456-xyz",
    });

    expect(shifts).toHaveLength(5);
  });
});
