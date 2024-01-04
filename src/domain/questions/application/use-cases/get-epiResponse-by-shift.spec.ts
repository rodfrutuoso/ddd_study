import { GetEPIResponseByShift } from "./get-epiResponse-by-shift";
import { InMemoryEpiResponseRepository } from "test/repositories/in-memory-epiResponse-repository";
import { makeEPIResponse } from "test/factories/make-epiResponse";
import { InMemoryEpiQuestionRepository } from "test/repositories/in-memory-epiQuestion-repository";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { makeEPIQuestion } from "test/factories/make-epiQuestion";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryEpiResponseRepository: InMemoryEpiResponseRepository;
let inMemoryEpiQuestionRepository: InMemoryEpiQuestionRepository;
let inMemoryShiftRepository: InMemoryShiftRepository;
let sut: GetEPIResponseByShift; // system under test

describe("Get EPIResponse By EPIResponse", () => {
  beforeEach(() => {
    inMemoryEpiResponseRepository = new InMemoryEpiResponseRepository();
    inMemoryEpiQuestionRepository = new InMemoryEpiQuestionRepository();
    inMemoryShiftRepository = new InMemoryShiftRepository();
    sut = new GetEPIResponseByShift(
      inMemoryEpiResponseRepository,
      inMemoryShiftRepository,
      inMemoryEpiQuestionRepository
    );
  });

  it("should be able to get a list of epiResponses of a shift", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift1);

    const question1 = makeEPIQuestion({
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-18"),
    });
    const question2 = makeEPIQuestion({ startDate: new Date("2023-12-13") });
    const question3 = makeEPIQuestion({
      startDate: new Date("2023-12-13"),
      endDate: new Date("2023-12-14"),
    });
    const question4 = makeEPIQuestion({ startDate: new Date("2023-12-13") });
    const question5 = makeEPIQuestion({ startDate: new Date("2023-12-17") });

    await inMemoryEpiQuestionRepository.create(question1);
    await inMemoryEpiQuestionRepository.create(question2);
    await inMemoryEpiQuestionRepository.create(question3);
    await inMemoryEpiQuestionRepository.create(question4);
    await inMemoryEpiQuestionRepository.create(question5);

    const newEPIResponse1 = makeEPIResponse({
      questionId: question1.id,
      shiftId: shift1.id,
      userId: new UniqueEntityId("user 1"),
    });
    const newEPIResponse2 = makeEPIResponse({
      questionId: question2.id,
      shiftId: shift1.id,
    });

    await inMemoryEpiResponseRepository.create(newEPIResponse1);
    await inMemoryEpiResponseRepository.create(newEPIResponse2);

    const { epiResponse } = await sut.execute({
      page: 1,
      shfitId: shift1.id.toString(),
    });

    expect(epiResponse).toHaveLength(3);
  });

  it("should be able to get a empty list of epi responses when there is no epi responses actives of the informed shift", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-02") });

    await inMemoryShiftRepository.create(shift1);

    const question1 = makeEPIQuestion({
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-18"),
    });
    const question2 = makeEPIQuestion({ startDate: new Date("2023-12-13") });
    const question3 = makeEPIQuestion({
      startDate: new Date("2023-12-13"),
      endDate: new Date("2023-12-14"),
    });
    const question4 = makeEPIQuestion({ startDate: new Date("2023-12-13") });
    const question5 = makeEPIQuestion({ startDate: new Date("2023-12-17") });

    await inMemoryEpiQuestionRepository.create(question1);
    await inMemoryEpiQuestionRepository.create(question2);
    await inMemoryEpiQuestionRepository.create(question3);
    await inMemoryEpiQuestionRepository.create(question4);
    await inMemoryEpiQuestionRepository.create(question5);

    const newEPIResponse1 = makeEPIResponse({
      questionId: question1.id,
      shiftId: shift1.id,
      userId: new UniqueEntityId("user 1"),
    });
    const newEPIResponse2 = makeEPIResponse({
      questionId: question2.id,
      shiftId: shift1.id,
    });

    await inMemoryEpiResponseRepository.create(newEPIResponse1);
    await inMemoryEpiResponseRepository.create(newEPIResponse2);

    const { epiResponse } = await sut.execute({
      page: 1,
      shfitId: shift1.id.toString(),
    });

    expect(epiResponse).toHaveLength(0);
  });

  it("should be able paginate a list of epiresponses of a date", async () => {
    const shift = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift);

    for (let i = 1; i <= 57; i++) {
      const question = makeEPIQuestion({ startDate: new Date("2023-12-13") });
      await inMemoryEpiQuestionRepository.create(makeEPIQuestion(question));

      await inMemoryEpiResponseRepository.create(
        makeEPIResponse({
          questionId: question.id,
          shiftId: shift.id,
          userId: new UniqueEntityId("user 1"),
        })
      );
    }

    const { epiResponse } = await sut.execute({
      page: 2,
      shfitId: shift.id.toString(),
    });

    expect(epiResponse).toHaveLength(7);
  });
});
