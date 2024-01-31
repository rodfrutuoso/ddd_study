/* eslint-disable @typescript-eslint/no-empty-function */
import { DeleteLaunch } from "./delete-launch";
import { InMemoryLaunchRepository } from "test/repositories/in-memory-launch-repository";
import { makeLaunch } from "test/factories/make-launch";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

let inMemoryLaunchRepository: InMemoryLaunchRepository;
let sut: DeleteLaunch; // system under test

describe("Delete Launch By Id", () => {
  beforeEach(() => {
    inMemoryLaunchRepository = new InMemoryLaunchRepository();
    sut = new DeleteLaunch(inMemoryLaunchRepository);
  });

  it("should be albe to delete a launch by its id", async () => {
    const newLaunch = await makeLaunch({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryLaunchRepository.create(newLaunch);

    await sut.execute({
      launchId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(await inMemoryLaunchRepository.findById("abc-123-xyz")).toBeNull();
    expect(await inMemoryLaunchRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a launch by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newLaunch = await makeLaunch({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryLaunchRepository.create(newLaunch);

    const result = await sut.execute({
      launchId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    // expect(async () => {
    //   return await sut.execute({
    //     launchId: "abc-123-xyz",
    //     programmerType: "CAMPO",
    //   });
    // }).rejects.toBeInstanceOf(Error);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAuthorizedError);
    expect(await inMemoryLaunchRepository.findById("abc-123-xyz")).toBeTruthy();
    expect(await inMemoryLaunchRepository.items).toHaveLength(1);
  });
});
