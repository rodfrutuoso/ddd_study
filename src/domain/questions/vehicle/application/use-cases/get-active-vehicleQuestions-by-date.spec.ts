import { GetVEHICLEQuestionByDate } from "./get-active-vehicleQuestions-by-date";
import { InMemoryVehicleQuestionRepository } from "test/repositories/in-memory-vehicleQuestion-repository";
import { makeVehicleQuestion } from "test/factories/make-vehicleQuestion";

let inMemoryVehicleQuestionRepository: InMemoryVehicleQuestionRepository;
let sut: GetVEHICLEQuestionByDate; // system under test

describe("Get VEHICLEQuestion By VEHICLEQuestion", () => {
  beforeEach(() => {
    inMemoryVehicleQuestionRepository = new InMemoryVehicleQuestionRepository();
    sut = new GetVEHICLEQuestionByDate(inMemoryVehicleQuestionRepository);
  });

  it("should be able to get a list of vehicleQuestions of a date", async () => {
    const newVEHICLEQuestion1 = makeVehicleQuestion({
      startDate: new Date("2023-12-11"),
    });
    const newVEHICLEQuestion2 = makeVehicleQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newVEHICLEQuestion3 = makeVehicleQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion1);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion2);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion3);

    const result = await sut.execute({
      page: 1,
      date: new Date("2023-12-15"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehiclequestion).toHaveLength(2);
    expect(result.value?.vehiclequestion).not.toContain(newVEHICLEQuestion3);
  });

  it("should be able to get a empty list of vehicle questions when there is no vehicle questions actives of the informed date", async () => {
    const newVEHICLEQuestion1 = makeVehicleQuestion({
      startDate: new Date("2023-12-11"),
    });
    const newVEHICLEQuestion2 = makeVehicleQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-17"),
    });
    const newVEHICLEQuestion3 = makeVehicleQuestion({
      startDate: new Date("2023-12-11"),
      endDate: new Date("2023-12-14"),
    });

    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion1);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion2);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion3);

    const result = await sut.execute({
      page: 1,
      date: new Date("2023-12-05"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehiclequestion).toHaveLength(0);
  });

  it("should be able paginate a list of vehiclequestions of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryVehicleQuestionRepository.create(
        makeVehicleQuestion({
          startDate: new Date("2023-12-11"),
          endDate: new Date("2023-12-17"),
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      date: new Date("2023-12-15"),
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehiclequestion).toHaveLength(7);
  });
});
