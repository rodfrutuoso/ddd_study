/* eslint-disable no-useless-constructor */
import { PhotoRepository } from "../repositories/photo-repository";

interface DeletePhotoInterfaceRequest {
  photoId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeletePhotoInterfaceResponse {}

export class DeletePhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute({
    photoId,
    programmerType,
  }: DeletePhotoInterfaceRequest): Promise<DeletePhotoInterfaceResponse> {
    const photo = await this.photoRepository.findById(photoId);

    if (!photo) throw new Error("Photo not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.photoRepository.delete(photo);

    return {};
  }
}
