import { GetAprRiskByCategory } from "./get-aprRisk-by-category";
import { InMemoryAprRiskRepository } from "test/repositories/in-memory-aprRisk-repository";
import { makeAprRisk } from "test/factories/make-aprRisk";

let inMemoryAprRiskRepository: InMemoryAprRiskRepository;
let sut: GetAprRiskByCategory; // system under test

describe("Get AprRisk By AprRisk", () => {
  beforeEach(() => {
    inMemoryAprRiskRepository = new InMemoryAprRiskRepository();
    sut = new GetAprRiskByCategory(inMemoryAprRiskRepository);
  });

  it("should be able to get a list of aprRisks of a category", async () => {
    const newAprRisk1 = makeAprRisk({
      category: "Houve problema com a camera?",
    });
    const newAprRisk2 = makeAprRisk({
      category: "Houve problema com a camera?",
    });
    const newAprRisk3 = makeAprRisk({
      category: "A gravação funcionu corretamente?",
    });

    await inMemoryAprRiskRepository.create(newAprRisk1);
    await inMemoryAprRiskRepository.create(newAprRisk2);
    await inMemoryAprRiskRepository.create(newAprRisk3);

    const result = await sut.execute({
      page: 1,
      category: "Houve problema com a camera",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprrisk).toHaveLength(2);
    expect(result.value?.aprrisk).not.toContain(newAprRisk3);
  });

  it("should be able to get a empty list of apr risks when there is no apr categorys of the informed category", async () => {
    const newAprRisk1 = makeAprRisk({
      category: "Houve problema com a camera?",
    });
    const newAprRisk2 = makeAprRisk({
      category: "Houve problema com a camera?",
    });
    const newAprRisk3 = makeAprRisk({
      category: "A gravação funcionu corretamente?",
    });

    await inMemoryAprRiskRepository.create(newAprRisk1);
    await inMemoryAprRiskRepository.create(newAprRisk2);
    await inMemoryAprRiskRepository.create(newAprRisk3);

    const result = await sut.execute({
      page: 1,
      category: "Pergunta de teste",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprrisk).toHaveLength(0);
  });

  it("should be able paginate a list of aprrisks of a category", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryAprRiskRepository.create(
        makeAprRisk({
          category: "Houve problema com a camera?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      category: "Houve problema com a camera?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprrisk).toHaveLength(7);
  });
});
