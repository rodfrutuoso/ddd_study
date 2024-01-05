/* eslint-disable @typescript-eslint/no-empty-function */
import { EditAprMeasure } from "./edit-aprMeasure-closure";
import { InMemoryAprMeasureRepository } from "test/repositories/in-memory-aprMeasure-repository";
import { makeAprMeasure } from "test/factories/make-aprMeasure";

let inMemoryAprMeasureRepository: InMemoryAprMeasureRepository;
let sut: EditAprMeasure; // system under test

describe("Edit APR Response By Id", () => {
  beforeEach(() => {
    inMemoryAprMeasureRepository = new InMemoryAprMeasureRepository();
    sut = new EditAprMeasure(inMemoryAprMeasureRepository);
  });

  it("should be albe to edit a epi question by its id", async () => {
    const newAprMeasure = await makeAprMeasure({
      response: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure);

    await sut.execute({
      questionId: newAprMeasure.id.toString(),
      programmerType: "PROGRAMAÇÃO",
    });

    expect(await inMemoryAprMeasureRepository.items[0]).toMatchObject({
      id: newAprMeasure.id,
      response: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });
    expect(await inMemoryAprMeasureRepository.items[0].endDate).toBeInstanceOf(
      Date
    );
  });

  it("should not be albe to edit a APR Response by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newAprMeasure = await makeAprMeasure({
      response: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryAprMeasureRepository.create(newAprMeasure);

    expect(async () => {
      return await sut.execute({
        questionId: newAprMeasure.id.toString(),
        programmerType: "CAMPO",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
