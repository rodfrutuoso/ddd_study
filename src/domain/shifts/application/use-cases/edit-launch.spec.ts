/* eslint-disable @typescript-eslint/no-empty-function */
import { EditLaunch } from "./edit-launch";
import { InMemorylaunchRepository } from "test/repositories/in-memory-launch-repository";
import { makeLaunch } from "test/factories/make-launch";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Value } from "../../enterprise/entities/value-objects/value";

let inMemoryShitRepository: InMemorylaunchRepository;
let sut: EditLaunch; // system under test

describe("Edit Launch By Id", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemorylaunchRepository();
    sut = new EditLaunch(inMemoryShitRepository);
  });

  it("should be albe to edit a launch by its id", async () => {
    const newLaunch = await makeLaunch(
      { value: new Value(123) },
      new UniqueEntityId("abc-123-xyz"),
    );

    await inMemoryShitRepository.create(newLaunch);

    await sut.execute({
      launchId: newLaunch.id.toString(),
      programmerType: "ADM",
      value: 456.789,
    });

    expect(await inMemoryShitRepository.items[0]).toMatchObject({
      value: new Value(456.789),
    });
  });

  it("should not be albe to edit a launch by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newLaunch = await makeLaunch(
      { value: new Value(123) },
      new UniqueEntityId("abc-123-xyz"),
    );

    await inMemoryShitRepository.create(newLaunch);

    expect(async () => {
      return await sut.execute({
        launchId: newLaunch.id.toString(),
        programmerType: "CAMPO",
        value: 456.789,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
