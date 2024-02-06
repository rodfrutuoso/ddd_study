import { GetAprMeasureByMeasure } from "./get-aprMeasure-by-measure";
import { InMemoryAprMeasureRepository } from "test/repositories/in-memory-aprMeasure-repository";
import { makeAprMeasure } from "test/factories/make-aprMeasure";

let inMemoryAprMeasureRepository: InMemoryAprMeasureRepository;
let sut: GetAprMeasureByMeasure; // system under test

describe("Get AprMeasure By AprMeasure", () => {
  beforeEach(() => {
    inMemoryAprMeasureRepository = new InMemoryAprMeasureRepository();
    sut = new GetAprMeasureByMeasure(inMemoryAprMeasureRepository);
  });

  it("should be able to get a list of apr measures of a measure", async () => {
    const newAprMeasure1 = makeAprMeasure({
      response: "Houve problema com a camera?",
    });
    const newAprMeasure2 = makeAprMeasure({
      response: "Houve problema com a camera?",
    });
    const newAprMeasure3 = makeAprMeasure({
      response: "A gravação funcionu corretamente?",
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure1);
    await inMemoryAprMeasureRepository.create(newAprMeasure2);
    await inMemoryAprMeasureRepository.create(newAprMeasure3);

    const result = await sut.execute({
      page: 1,
      response: "Houve problema com a camera",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprmeasure).toHaveLength(2);
    expect(result.value?.aprmeasure).not.toContain(newAprMeasure3);
  });

  it("should be able to get a empty list of apr measures when there is no apr measures of the informed measure", async () => {
    const newAprMeasure1 = makeAprMeasure({
      response: "Houve problema com a camera?",
    });
    const newAprMeasure2 = makeAprMeasure({
      response: "Houve problema com a camera?",
    });
    const newAprMeasure3 = makeAprMeasure({
      response: "A gravação funcionu corretamente?",
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure1);
    await inMemoryAprMeasureRepository.create(newAprMeasure2);
    await inMemoryAprMeasureRepository.create(newAprMeasure3);

    const result = await sut.execute({
      page: 1,
      response: "Pergunta de teste",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprmeasure).toHaveLength(0);
  });

  it("should be able paginate a list of aprmeasures of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryAprMeasureRepository.create(
        makeAprMeasure({
          response: "Houve problema com a camera?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      response: "Houve problema com a camera?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprmeasure).toHaveLength(7);
  });
});
