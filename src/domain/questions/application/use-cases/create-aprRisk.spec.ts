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
    const { aprRisk } = await sut.execute({
      question: "Há risco de choque na rede?",
      category: "Risco Elétrico",
    });

    expect(aprRisk.id).toBeTruthy();
    expect(aprRisk.question).toEqual("Há risco de choque na rede?");
    expect(aprRisk.category).toEqual("Risco Elétrico");
  });
});
