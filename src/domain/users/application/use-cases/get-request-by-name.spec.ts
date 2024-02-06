import { GetRequestByName } from "./get-request-by-name";
import { InMemoryRequestRepository } from "test/repositories/in-memory-request-repository";
import { makeRequest } from "test/factories/make-request";

let inMemoryRequestRepository: InMemoryRequestRepository;
let sut: GetRequestByName; // system under test

describe("Get Request By Request", () => {
  beforeEach(() => {
    inMemoryRequestRepository = new InMemoryRequestRepository();
    sut = new GetRequestByName(inMemoryRequestRepository);
  });

  it("should be able to get a list of request's of a name", async () => {
    const newRequest1 = makeRequest({
      name: "João da Pamonha?",
    });
    const newRequest2 = makeRequest({
      name: "João da Pimbada",
    });
    const newRequest3 = makeRequest({
      name: "Rafael da Pamonha",
    });

    await inMemoryRequestRepository.create(newRequest1);
    await inMemoryRequestRepository.create(newRequest2);
    await inMemoryRequestRepository.create(newRequest3);

    const result = await sut.execute({
      page: 1,
      name: "João",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.request).toHaveLength(2);
    expect(result.value?.request).not.toContain(newRequest3);
  });

  it("should be able to get a empty list of vehicle names when there is no vehicle names actives of the informed date", async () => {
    const newRequest1 = makeRequest({
      name: "João da Pamonha?",
    });
    const newRequest2 = makeRequest({
      name: "João da Pimbada",
    });
    const newRequest3 = makeRequest({
      name: "Rafael da Pamonha",
    });

    await inMemoryRequestRepository.create(newRequest1);
    await inMemoryRequestRepository.create(newRequest2);
    await inMemoryRequestRepository.create(newRequest3);

    const result = await sut.execute({
      page: 1,
      name: "Max",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.request).toHaveLength(0);
  });

  it("should be able paginate a list of requests of a date", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryRequestRepository.create(
        makeRequest({
          name: "João da Pamonha?",
        })
      );
    }

    const result = await sut.execute({
      page: 2,
      name: "João da Pamonha?",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.request).toHaveLength(7);
  });
});
