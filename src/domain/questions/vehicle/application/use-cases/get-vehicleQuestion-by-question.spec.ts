import { GetVEHICLEQuestionByQuestion } from "./get-vehicleQuestion-by-question";
import { InMemoryVehicleQuestionRepository } from "test/repositories/in-memory-vehicleQuestion-repository";
import { makeVehicleQuestion } from "test/factories/make-vehicleQuestion";

let inMemoryVehicleQuestionRepository: InMemoryVehicleQuestionRepository;
let sut: GetVEHICLEQuestionByQuestion; // system under test

describe("Get VEHICLEQuestion By VEHICLEQuestion", () => {
  beforeEach(() => {
    inMemoryVehicleQuestionRepository = new InMemoryVehicleQuestionRepository();
    sut = new GetVEHICLEQuestionByQuestion(inMemoryVehicleQuestionRepository);
  });

  it("should be able to get a list of vehicleQuestions of a date", async () => {
    const newVEHICLEQuestion1 = makeVehicleQuestion({
      question: "Houve problema com a camera?",
    });
    const newVEHICLEQuestion2 = makeVehicleQuestion({
      question: "Houve problema com a camera?",
    });
    const newVEHICLEQuestion3 = makeVehicleQuestion({
      question: "A gravação funcionu corretamente?",
    });

    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion1);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion2);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion3);

    const result = await sut.execute({
      page: 1,
      question: "Houve problema com a camera",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehiclequestion).toHaveLength(2);
    expect(result.value?.vehiclequestion).not.toContain(newVEHICLEQuestion3);
  });

  it("should be able to get a empty list of vehicle questions when there is no vehicle questions actives of the informed date", async () => {
    const newVEHICLEQuestion1 = makeVehicleQuestion({
      question: "Houve problema com a camera?",
    });
    const newVEHICLEQuestion2 = makeVehicleQuestion({
      question: "Houve problema com a camera?",
    });
    const newVEHICLEQuestion3 = makeVehicleQuestion({
      question: "A gravação funcionu corretamente?",
    });

    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion1);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion2);
    await inMemoryVehicleQuestionRepository.create(newVEHICLEQuestion3);

    const result = await sut.execute({
      page: 1,
      question: "Pergunta de teste",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehiclequestion).toHaveLength(0);
  });

  it("should be able paginate a list of vehiclequestions of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryVehicleQuestionRepository.create(
        makeVehicleQuestion({
          question: "Houve problema com a camera?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      question: "Houve problema com a camera?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.vehiclequestion).toHaveLength(7);
  });
});
