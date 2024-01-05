/* eslint-disable @typescript-eslint/no-empty-function */
import { CreateAprMeasure } from "./create-aprMeasure";
import { InMemoryAprMeasureRepository } from "test/repositories/in-memory-aprMeasure-repository";

let inMemoryAprMeasureRepository: InMemoryAprMeasureRepository;
let sut: CreateAprMeasure; // system under test

describe("Register a AprMeasure-Shift", () => {
  beforeEach(() => {
    inMemoryAprMeasureRepository = new InMemoryAprMeasureRepository();
    sut = new CreateAprMeasure(inMemoryAprMeasureRepository);
  });

  it("should create a EPI Question", async () => {
    const { aprMeasure } = await sut.execute({
      response: "Há risco de choque na rede?",
      category: "Risco Elétrico",
    });

    expect(aprMeasure.id).toBeTruthy();
    expect(aprMeasure.response).toEqual("Há risco de choque na rede?");
    expect(aprMeasure.category).toEqual("Risco Elétrico");
  });
});
