/* eslint-disable @typescript-eslint/no-empty-function */
import { EditAprRisk } from "./edit-aprRisk-closure";
import { InMemoryAprRiskRepository } from "test/repositories/in-memory-aprRisk-repository";
import { makeAprRisk } from "test/factories/make-aprRisk";

let inMemoryAprRiskRepository: InMemoryAprRiskRepository;
let sut: EditAprRisk; // system under test

describe("Edit APR Risk By Id", () => {
  beforeEach(() => {
    inMemoryAprRiskRepository = new InMemoryAprRiskRepository();
    sut = new EditAprRisk(inMemoryAprRiskRepository);
  });

  it("should be albe to edit a epi question by its id", async () => {
    const newAprRisk = await makeAprRisk({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryAprRiskRepository.create(newAprRisk);

    await sut.execute({
      questionId: newAprRisk.id.toString(),
      programmerType: "PROGRAMAÇÃO",
    });

    expect(await inMemoryAprRiskRepository.items[0]).toMatchObject({
      id: newAprRisk.id,
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });
    expect(await inMemoryAprRiskRepository.items[0].endDate).toBeInstanceOf(
      Date
    );
  });

  it("should not be albe to edit a APR Response by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newAprRisk = await makeAprRisk({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryAprRiskRepository.create(newAprRisk);

    expect(async () => {
      return await sut.execute({
        questionId: newAprRisk.id.toString(),
        programmerType: "CAMPO",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
