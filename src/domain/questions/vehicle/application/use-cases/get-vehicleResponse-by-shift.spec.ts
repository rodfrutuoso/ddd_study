import { GetVEHICLEResponseByShift } from "./get-vehicleResponse-by-shift";
import { InMemoryVehicleResponseRepository } from "test/repositories/in-memory-vehicleResponse-repository";
import { makeVEHICLEResponse } from "test/factories/make-vehicleResponse";
import { InMemoryVehicleQuestionRepository } from "test/repositories/in-memory-vehicleQuestion-repository";
import { InMemoryShiftRepository } from "test/repositories/in-memory-shift-repository";
import { makeShift } from "test/factories/make-shift";
import { makeVehicleQuestion } from "test/factories/make-vehicleQuestion";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryVehicleResponseRepository: InMemoryVehicleResponseRepository;
let inMemoryVehicleQuestionRepository: InMemoryVehicleQuestionRepository;
let inMemoryShiftRepository: InMemoryShiftRepository;
let sut: GetVEHICLEResponseByShift; // system under test

describe("Get VEHICLEResponse By VEHICLEResponse", () => {
  beforeEach(() => {
    inMemoryVehicleResponseRepository = new InMemoryVehicleResponseRepository();
    inMemoryVehicleQuestionRepository = new InMemoryVehicleQuestionRepository();
    inMemoryShiftRepository = new InMemoryShiftRepository();
    sut = new GetVEHICLEResponseByShift(
      inMemoryVehicleResponseRepository,
      inMemoryShiftRepository,
      inMemoryVehicleQuestionRepository
    );
  });

  it("should be able to get a list of vehicleResponses of a shift", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift1);

    const question1 = makeVehicleQuestion({
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-18"),
    });
    const question2 = makeVehicleQuestion({
      startDate: new Date("2023-12-13"),
    });
    const question3 = makeVehicleQuestion({
      startDate: new Date("2023-12-13"),
      endDate: new Date("2023-12-14"),
    });
    const question4 = makeVehicleQuestion({
      startDate: new Date("2023-12-13"),
    });
    const question5 = makeVehicleQuestion({
      startDate: new Date("2023-12-17"),
    });

    await inMemoryVehicleQuestionRepository.create(question1);
    await inMemoryVehicleQuestionRepository.create(question2);
    await inMemoryVehicleQuestionRepository.create(question3);
    await inMemoryVehicleQuestionRepository.create(question4);
    await inMemoryVehicleQuestionRepository.create(question5);

    const newVEHICLEResponse1 = makeVEHICLEResponse({
      questionId: question1.id,
      shiftId: shift1.id,
      vehicleId: new UniqueEntityId("vehicle 1"),
    });
    const newVEHICLEResponse2 = makeVEHICLEResponse({
      questionId: question2.id,
      shiftId: shift1.id,
    });

    await inMemoryVehicleResponseRepository.create(newVEHICLEResponse1);
    await inMemoryVehicleResponseRepository.create(newVEHICLEResponse2);

    const { vehicleResponse } = await sut.execute({
      page: 1,
      shfitId: shift1.id.toString(),
    });

    expect(vehicleResponse).toHaveLength(3);
  });

  it("should be able to get a empty list of vehicle responses when there is no vehicle responses actives of the informed shift", async () => {
    const shift1 = makeShift({ date: new Date("2023-12-02") });

    await inMemoryShiftRepository.create(shift1);

    const question1 = makeVehicleQuestion({
      startDate: new Date("2023-12-10"),
      endDate: new Date("2023-12-18"),
    });
    const question2 = makeVehicleQuestion({
      startDate: new Date("2023-12-13"),
    });
    const question3 = makeVehicleQuestion({
      startDate: new Date("2023-12-13"),
      endDate: new Date("2023-12-14"),
    });
    const question4 = makeVehicleQuestion({
      startDate: new Date("2023-12-13"),
    });
    const question5 = makeVehicleQuestion({
      startDate: new Date("2023-12-17"),
    });

    await inMemoryVehicleQuestionRepository.create(question1);
    await inMemoryVehicleQuestionRepository.create(question2);
    await inMemoryVehicleQuestionRepository.create(question3);
    await inMemoryVehicleQuestionRepository.create(question4);
    await inMemoryVehicleQuestionRepository.create(question5);

    const newVEHICLEResponse1 = makeVEHICLEResponse({
      questionId: question1.id,
      shiftId: shift1.id,
      vehicleId: new UniqueEntityId("vehicle 1"),
    });
    const newVEHICLEResponse2 = makeVEHICLEResponse({
      questionId: question2.id,
      shiftId: shift1.id,
    });

    await inMemoryVehicleResponseRepository.create(newVEHICLEResponse1);
    await inMemoryVehicleResponseRepository.create(newVEHICLEResponse2);

    const { vehicleResponse } = await sut.execute({
      page: 1,
      shfitId: shift1.id.toString(),
    });

    expect(vehicleResponse).toHaveLength(0);
  });

  it("should be able paginate a list of vehicleresponses of a date", async () => {
    const shift = makeShift({ date: new Date("2023-12-15") });

    await inMemoryShiftRepository.create(shift);

    for (let i = 1; i <= 57; i++) {
      const question = makeVehicleQuestion({
        startDate: new Date("2023-12-13"),
      });
      await inMemoryVehicleQuestionRepository.create(
        makeVehicleQuestion(question)
      );

      await inMemoryVehicleResponseRepository.create(
        makeVEHICLEResponse({
          questionId: question.id,
          shiftId: shift.id,
          vehicleId: new UniqueEntityId("vehicle 1"),
        })
      );
    }

    const { vehicleResponse } = await sut.execute({
      page: 2,
      shfitId: shift.id.toString(),
    });

    expect(vehicleResponse).toHaveLength(7);
  });
});
