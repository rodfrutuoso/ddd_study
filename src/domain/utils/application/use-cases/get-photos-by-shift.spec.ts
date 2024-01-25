import { GetPhotoByShift } from "./get-photos-by-shift";
import { InMemoryPhotoRepository } from "test/repositories/in-memory-photo-repository";
import { makePhoto } from "test/factories/make-photo";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

let inMemoryShitRepository: InMemoryPhotoRepository;
let sut: GetPhotoByShift; // system under test

describe("Get Photo By shift", () => {
  beforeEach(() => {
    inMemoryShitRepository = new InMemoryPhotoRepository();
    sut = new GetPhotoByShift(inMemoryShitRepository);
  });

  it("should be able to get a list of photos of a shift", async () => {
    const newPhoto1 = makePhoto({
      shiftId: new UniqueEntityId("shift1"),
    });
    const newPhoto2 = makePhoto({
      shiftId: new UniqueEntityId("shift2"),
    });
    const newPhoto3 = makePhoto({
      shiftId: new UniqueEntityId("shift1"),
    });

    await inMemoryShitRepository.create(newPhoto1);
    await inMemoryShitRepository.create(newPhoto2);
    await inMemoryShitRepository.create(newPhoto3);

    const { photos } = await sut.execute({
      page: 1,
      shiftId: "shift1",
    });

    expect(photos).toHaveLength(2);
    expect(photos).not.toContain(newPhoto2);
  });

  it("should be able to get a empty list of photos when there is no shifts with the informed shiftId ", async () => {
    const newPhoto1 = makePhoto();
    const newPhoto2 = makePhoto();
    const newPhoto3 = makePhoto();

    await inMemoryShitRepository.create(newPhoto1);
    await inMemoryShitRepository.create(newPhoto2);
    await inMemoryShitRepository.create(newPhoto3);

    const { photos } = await sut.execute({
      shiftId: "shift1",
      page: 1,
    });

    expect(photos).toHaveLength(0);
  });

  it("should be able paginate a list of photos of a shift", async () => {
    for (let i = 1; i <= 57; i++) {
      await inMemoryShitRepository.create(
        makePhoto({
          shiftId: new UniqueEntityId("shift1"),
        })
      );
    }

    const { photos } = await sut.execute({
      shiftId: "shift1",
      page: 2,
    });

    expect(photos).toHaveLength(7);
  });
});
