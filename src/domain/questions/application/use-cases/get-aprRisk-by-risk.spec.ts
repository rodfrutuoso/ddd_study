import { GetAprRiskByRisk } from "./get-aprRisk-by-risk";
import { InMemoryAprRiskRepository } from "test/repositories/in-memory-aprRisk-repository";
import { makeAprRisk } from "test/factories/make-aprRisk";

let inMemoryAprRiskRepository: InMemoryAprRiskRepository;
let sut: GetAprRiskByRisk; // system under test

describe("Get AprRisk By AprRisk", () => {
  beforeEach(() => {
    inMemoryAprRiskRepository = new InMemoryAprRiskRepository();
    sut = new GetAprRiskByRisk(inMemoryAprRiskRepository);
  });

  it("should be able to get a list of aprRisks of a date", async () => {
    const newAprRisk1 = makeAprRisk({
      question: "Houve problema com a camera?",
    });
    const newAprRisk2 = makeAprRisk({
      question: "Houve problema com a camera?",
    });
    const newAprRisk3 = makeAprRisk({
      question: "A gravação funcionu corretamente?",
    });

    await inMemoryAprRiskRepository.create(newAprRisk1);
    await inMemoryAprRiskRepository.create(newAprRisk2);
    await inMemoryAprRiskRepository.create(newAprRisk3);

    const { aprrisk } = await sut.execute({
      page: 1,
      question: "Houve problema com a camera",
    });

    expect(aprrisk).toHaveLength(2);
    expect(aprrisk).not.toContain(newAprRisk3);
  });

  it("should be able to get a empty list of epi questions when there is no epi questions actives of the informed date", async () => {
    const newAprRisk1 = makeAprRisk({
      question: "Houve problema com a camera?",
    });
    const newAprRisk2 = makeAprRisk({
      question: "Houve problema com a camera?",
    });
    const newAprRisk3 = makeAprRisk({
      question: "A gravação funcionu corretamente?",
    });

    await inMemoryAprRiskRepository.create(newAprRisk1);
    await inMemoryAprRiskRepository.create(newAprRisk2);
    await inMemoryAprRiskRepository.create(newAprRisk3);

    const { aprrisk } = await sut.execute({
      page: 1,
      question: "Pergunta de teste",
    });

    expect(aprrisk).toHaveLength(0);
  });

  it("should be able paginate a list of aprrisks of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryAprRiskRepository.create(
        makeAprRisk({
          question: "Houve problema com a camera?",
        })
      );
    }

    const { aprrisk } = await sut.execute({
      page: 2,
      question: "Houve problema com a camera?",
    });

    expect(aprrisk).toHaveLength(7);
  });
});
