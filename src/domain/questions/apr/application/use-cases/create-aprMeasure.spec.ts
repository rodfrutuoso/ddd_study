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
    const result = await sut.execute({
      response: "Há risco de choque na rede?",
      category: "Risco Elétrico",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.aprMeasure.id).toBeTruthy();
    expect(result.value?.aprMeasure.response).toEqual(
      "Há risco de choque na rede?"
    );
    expect(result.value?.aprMeasure.category).toEqual("Risco Elétrico");
  });
});
