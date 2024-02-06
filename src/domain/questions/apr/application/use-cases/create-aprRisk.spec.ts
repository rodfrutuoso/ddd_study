/* eslint-disable @typescript-eslint/no-empty-function */
import { CreateAprRisk } from "./create-aprRisk";
import { InMemoryAprRiskRepository } from "test/repositories/in-memory-aprRisk-repository";

let inMemoryAprRiskRepository: InMemoryAprRiskRepository;
let sut: CreateAprRisk; // system under test

describe("Register a AprRisk-Shift", () => {
  beforeEach(() => {
    inMemoryAprRiskRepository = new InMemoryAprRiskRepository();
    sut = new CreateAprRisk(inMemoryAprRiskRepository);
  });

  it("should create a EPI Question", async () => {
    const result = await sut.execute({
      question: "Há risco de choque na rede?",
      category: "Risco Elétrico",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprRisk.id).toBeTruthy();
    expect(result.value?.aprRisk.question).toEqual(
      "Há risco de choque na rede?"
    );
    expect(result.value?.aprRisk.category).toEqual("Risco Elétrico");
  });
});
