/* eslint-disable @typescript-eslint/no-empty-function */
import { RegisterPhoto } from "./register-photo";
import { InMemoryPhotoRepository } from "test/repositories/in-memory-photo-repository";

let inMemoryPhotoRepository: InMemoryPhotoRepository;
let sut: RegisterPhoto; // system under test

describe("Register a Photo-Shift", () => {
  beforeEach(() => {
    inMemoryPhotoRepository = new InMemoryPhotoRepository();
    sut = new RegisterPhoto(inMemoryPhotoRepository);
  });

  it("should register a photo in a specifc shift", async () => {
    const result = await sut.execute({
      shiftId: "shift test id",
      linkDrive: "https://drive.google.com/drive/file/1nuh321kh4u2g4ku21g",
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value?.photo.id).toBeTruthy();
    expect(result.value?.photo.linkDrive).toEqual(
      "https://drive.google.com/drive/file/1nuh321kh4u2g4ku21g"
    );
    expect(result.value?.photo.shiftId.toString()).toEqual("shift test id");
  });
});
