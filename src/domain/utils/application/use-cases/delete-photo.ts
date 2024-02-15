/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { PhotoRepository } from "../repositories/photo-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeletePhotoInterfaceRequest {
  photoId: string;
  programmerType: string;
}

type DeletePhotoInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  object
>;

export class DeletePhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute({
    photoId,
    programmerType,
  }: DeletePhotoInterfaceRequest): Promise<DeletePhotoInterfaceResponse> {
    const photo = await this.photoRepository.findById(photoId);

    if (!photo) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.photoRepository.delete(photo);

    return right({});
  }
}
