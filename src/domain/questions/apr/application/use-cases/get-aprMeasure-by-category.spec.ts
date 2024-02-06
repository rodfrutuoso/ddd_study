import { GetAprMeasureByCategory } from "./get-aprMeasure-by-category";
import { InMemoryAprMeasureRepository } from "test/repositories/in-memory-aprMeasure-repository";
import { makeAprMeasure } from "test/factories/make-aprMeasure";

let inMemoryAprMeasureRepository: InMemoryAprMeasureRepository;
let sut: GetAprMeasureByCategory; // system under test

describe("Get AprMeasure By caregory", () => {
  beforeEach(() => {
    inMemoryAprMeasureRepository = new InMemoryAprMeasureRepository();
    sut = new GetAprMeasureByCategory(inMemoryAprMeasureRepository);
  });

  it("should be able to get a list of aprMeasures of a category", async () => {
    const newAprMeasure1 = makeAprMeasure({
      category: "Houve problema com a camera?",
    });
    const newAprMeasure2 = makeAprMeasure({
      category: "Houve problema com a camera?",
    });
    const newAprMeasure3 = makeAprMeasure({
      category: "A gravação funcionu corretamente?",
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure1);
    await inMemoryAprMeasureRepository.create(newAprMeasure2);
    await inMemoryAprMeasureRepository.create(newAprMeasure3);

    const result = await sut.execute({
      page: 1,
      category: "Houve problema com a camera",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprmeasure).toHaveLength(2);
    expect(result.value?.aprmeasure).not.toContain(newAprMeasure3);
  });

  it("should be able to get a empty list of apr measures when there is no apr measures of the informed category", async () => {
    const newAprMeasure1 = makeAprMeasure({
      category: "Houve problema com a camera?",
    });
    const newAprMeasure2 = makeAprMeasure({
      category: "Houve problema com a camera?",
    });
    const newAprMeasure3 = makeAprMeasure({
      category: "A gravação funcionu corretamente?",
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure1);
    await inMemoryAprMeasureRepository.create(newAprMeasure2);
    await inMemoryAprMeasureRepository.create(newAprMeasure3);

    const result = await sut.execute({
      page: 1,
      category: "Pergunta de teste",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprmeasure).toHaveLength(0);
  });

  it("should be able paginate a list of apr measures of a category", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryAprMeasureRepository.create(
        makeAprMeasure({
          category: "Houve problema com a camera?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      category: "Houve problema com a camera?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprmeasure).toHaveLength(7);
  });
});
