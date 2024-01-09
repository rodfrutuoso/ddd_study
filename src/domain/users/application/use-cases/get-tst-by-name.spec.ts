import { GetTstByName } from "./get-tst-by-name";
import { InMemoryTstRepository } from "test/repositories/in-memory-tst-repository";
import { makeTst } from "test/factories/make-tst";

let inMemoryTstRepository: InMemoryTstRepository;
let sut: GetTstByName; // system under test

describe("Get Tst By Tst", () => {
  beforeEach(() => {
    inMemoryTstRepository = new InMemoryTstRepository();
    sut = new GetTstByName(inMemoryTstRepository);
  });

  it("should be able to get a list of tst's of a name", async () => {
    const newTst1 = makeTst({
      name: "João da Pamonha?",
    });
    const newTst2 = makeTst({
      name: "João da Pimbada",
    });
    const newTst3 = makeTst({
      name: "Rafael da Pamonha",
    });

    await inMemoryTstRepository.create(newTst1);
    await inMemoryTstRepository.create(newTst2);
    await inMemoryTstRepository.create(newTst3);

    const { tst } = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(tst).toHaveLength(2);
    expect(tst).not.toContain(newTst3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newTst1 = makeTst({
      name: "João da Pamonha?",
    });
    const newTst2 = makeTst({
      name: "João da Pimbada",
    });
    const newTst3 = makeTst({
      name: "Rafael da Pamonha",
    });

    await inMemoryTstRepository.create(newTst1);
    await inMemoryTstRepository.create(newTst2);
    await inMemoryTstRepository.create(newTst3);

    const { tst } = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(tst).toHaveLength(0);
  });

  it("should be able paginate a list of tsts of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryTstRepository.create(
        makeTst({
          name: "João da Pamonha?",
        })
      );
    }

    const { tst } = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(tst).toHaveLength(7);
  });
});
