/* eslint-disable @typescript-eslint/no-empty-function */
import { DeletePhoto } from "./delete-photo";
import { InMemoryPhotoRepository } from "test/repositories/in-memory-photo-repository";
import { makePhoto } from "test/factories/make-photo";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryPhotoRepository: InMemoryPhotoRepository;
let sut: DeletePhoto; // system under test

describe("Delete Photo By Id", () => {
  beforeEach(() => {
    inMemoryPhotoRepository = new InMemoryPhotoRepository();
    sut = new DeletePhoto(inMemoryPhotoRepository);
  });

  it("should be albe to delete a photo by its id", async () => {
    const newPhoto = await makePhoto({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryPhotoRepository.create(newPhoto);

    const result = await sut.execute({
      photoId: "abc-123-xyz",
      programmerType: "ADM",
    });

    expect(result.isRight()).toBeTruthy();
    expect(await inMemoryPhotoRepository.findById("abc-123-xyz")).toBeNull();
    expect(await inMemoryPhotoRepository.items).toHaveLength(0);
  });

  it("should not be albe to delete a photo by its id from a user that type is not ADM or PROGRAMAÇÃO", async () => {
    const newPhoto = await makePhoto({}, new UniqueEntityId("abc-123-xyz"));

    await inMemoryPhotoRepository.create(newPhoto);

    const result = await sut.execute({
      photoId: "abc-123-xyz",
      programmerType: "CAMPO",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(await inMemoryPhotoRepository.findById("abc-123-xyz")).toBeTruthy();
    expect(await inMemoryPhotoRepository.items).toHaveLength(1);
  });
});
