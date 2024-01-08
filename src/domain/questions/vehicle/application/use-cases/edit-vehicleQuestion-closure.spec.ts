/* eslint-disable @typescript-eslint/no-empty-function */
import { EditVehicleQuestion } from "./edit-vehicleQuestion-closure";
import { InMemoryVehicleQuestionRepository } from "test/repositories/in-memory-vehicleQuestion-repository";
import { makeVehicleQuestion } from "test/factories/make-vehicleQuestion";

let inMemoryVehicleQuestionRepository: InMemoryVehicleQuestionRepository;
let sut: EditVehicleQuestion; // system under test

describe("Edit VEHICLE Question By Id", () => {
  beforeEach(() => {
    inMemoryVehicleQuestionRepository = new InMemoryVehicleQuestionRepository();
    sut = new EditVehicleQuestion(inMemoryVehicleQuestionRepository);
  });

  it("should be albe to edit a vehicle question by its id", async () => {
    const newVEHICLEQuestion = await makeVehicleQuestion({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion);

    await sut.execute({
      questionId: newVEHICLEQuestion.id.toString(),
      programmerType: "PROGRAMAÇÃO",
    });

    expect(await inMemoryVehicleQuestionRepository.items[0]).toMatchObject({
      id: newVEHICLEQuestion.id,
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });
    expect(
      await inMemoryVehicleQuestionRepository.items[0].endDate
    ).toBeInstanceOf(Date);
  });

  it("should not be albe to edit a vehicle question by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newVEHICLEQuestion = await makeVehicleQuestion({
      question: "FAZENDA-NUM-SEI-DAS-CONTAS",
    });

    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion);

    expect(async () => {
      return await sut.execute({
        questionId: newVEHICLEQuestion.id.toString(),
        programmerType: "CAMPO",
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
