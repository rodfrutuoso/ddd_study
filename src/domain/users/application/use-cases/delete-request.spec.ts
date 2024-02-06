/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteRequest } from "./delete-request";
import { InMemoryRequestRepository } from "test/repositories/in-memory-request-repository";
import { makeRequest } from "test/factories/make-request";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryRequestRepository: InMemoryRequestRepository;
let sut: DeleteRequest; // system under test

describe("Delete Request By Id", () => {
  beforeEach(() => {
    inMemoryRequestRepository = new InMemoryRequestRepository();
    sut = new DeleteRequest(inMemoryRequestRepository);
  });

  it("should be albe to delete a request by its id", async () => {
    const newRequest = await makeRequest({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryRequestRepository.create(newRequest);

    const result = await sut.execute({
      requestId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryRequestRepository.findById("abc-123-xyz")).toBeNull();
    expect(await inMemoryRequestRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a request by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newRequest = await makeRequest({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryRequestRepository.create(newRequest);

    const result = await sut.execute({
      requestId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(
      await inMemoryRequestRepository.findById("abc-123-xyz")
    ).toBeTruthy();
    expect(await inMemoryRequestRepository.items).toHaveLength(1);
  });
});
