import { GetSMCResponseByShift } from "./get-smcResponse-by-shift";
import { InMemorySmcResponseRepository } from "test/repositories/in-memory-smcResponse-repository";
import { makeSMCResponse } from "test/factories/make-smcResponse";
import { InMemorySmcQuestionRepository } from "test/repositories/in-memory-smcQuestion-repository";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { makeSMCQuestion } from "test/factories/make-smcQuestion";

let inMemorySmcResponseRepository: InMemorySmcResponseRepository;
let inMemorySmcQuestionRepository: InMemorySmcQuestionRepository;
let inMemoryShiftRepository: InMemoryShiftRepository;
let sut: GetSMCResponseByShift; // system under test

describe("Get SMCResponse By SMCResponse", () => {
  beforeEach(() => {
    inMemorySmcResponseRepository = new InMemorySmcResponseRepository();
    inMemorySmcQuestionRepository = new InMemorySmcQuestionRepository();
    inMemoryShiftRepository = new InMemoryShiftRepository();
    sut = new GetSMCResponseByShift(
      inMemorySmcResponseRepository,
      inMemoryShiftRepository,
      inMemorySmcQuestionRepository
    );
  });

  it("should be able to get a list of smcResponses of a shift", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift1);

    const question1 = makeSMCQuestion({
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-18"),
    });
    const question2 = makeSMCQuestion({ startDate: new Date("2023-12-13") });
    const question3 = makeSMCQuestion({
      startDate: new Date("2023-12-13"),
      endDate: new Date("2023-12-14"),
    });
    const question4 = makeSMCQuestion({ startDate: new Date("2023-12-13") });
    const question5 = makeSMCQuestion({ startDate: new Date("2023-12-17") });

    await inMemorySmcQuestionRepository.create(question1);
    await inMemorySmcQuestionRepository.create(question2);
    await inMemorySmcQuestionRepository.create(question3);
    await inMemorySmcQuestionRepository.create(question4);
    await inMemorySmcQuestionRepository.create(question5);

    const newSMCResponse1 = makeSMCResponse({
      questionId: question1.id,
      shiftId: shift1.id,
      cameraCode: "ECO00015",
      flaw: "LOW BATERY",
    });
    const newSMCResponse2 = makeSMCResponse({
      questionId: question2.id,
      shiftId: shift1.id,
    });

    await inMemorySmcResponseRepository.create(newSMCResponse1);
    await inMemorySmcResponseRepository.create(newSMCResponse2);

    const { smcResponse } = await sut.execute({
      page: 1,
      shfitId: shift1.id.toString(),
    });

    expect(smcResponse).toHaveLength(3);
  });

  it("should be able to get a empty list of smc responses when there is no smc responses actives of the informed shift", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-02") });

    await inMemoryShiftRepository.create(shift1);

    const question1 = makeSMCQuestion({
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-18"),
    });
    const question2 = makeSMCQuestion({ startDate: new Date("2023-12-13") });
    const question3 = makeSMCQuestion({
      startDate: new Date("2023-12-13"),
      endDate: new Date("2023-12-14"),
    });
    const question4 = makeSMCQuestion({ startDate: new Date("2023-12-13") });
    const question5 = makeSMCQuestion({ startDate: new Date("2023-12-17") });

    await inMemorySmcQuestionRepository.create(question1);
    await inMemorySmcQuestionRepository.create(question2);
    await inMemorySmcQuestionRepository.create(question3);
    await inMemorySmcQuestionRepository.create(question4);
    await inMemorySmcQuestionRepository.create(question5);

    const newSMCResponse1 = makeSMCResponse({
      questionId: question1.id,
      shiftId: shift1.id,
      cameraCode: "ECO00015",
      flaw: "LOW BATERY",
    });
    const newSMCResponse2 = makeSMCResponse({
      questionId: question2.id,
      shiftId: shift1.id,
    });

    await inMemorySmcResponseRepository.create(newSMCResponse1);
    await inMemorySmcResponseRepository.create(newSMCResponse2);

    const { smcResponse } = await sut.execute({
      page: 1,
      shfitId: shift1.id.toString(),
    });

    expect(smcResponse).toHaveLength(0);
  });

  it("should be able paginate a list of smcresponses of a date", async () => {
    const shift = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift);

    for (let i = 1; i <= 57; i++) {
      const question = makeSMCQuestion({ startDate: new Date("2023-12-13") });
      await inMemorySmcQuestionRepository.create(makeSMCQuestion(question));

      await inMemorySmcResponseRepository.create(
        makeSMCResponse({
          questionId: question.id,
          shiftId: shift.id,
          cameraCode: "ECO00015",
          flaw: "LOW BATERY",
        })
      );
    }

    const { smcResponse } = await sut.execute({
      page: 2,
      shfitId: shift.id.toString(),
    });

    expect(smcResponse).toHaveLength(7);
  });
});
