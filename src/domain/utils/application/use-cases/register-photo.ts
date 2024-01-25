/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Photo } from "../../enterprise/entities/photo";
import { PhotoRepository } from "../repositories/photo-repository";

interface RegisterPhotoInterfaceRequest {
  type?: string;
  typeId?: string;
  shiftId: string;
  linkDrive: string;
}

interface RegisterPhotoInterfaceResponse {
  photo: Photo;
}

export class RegisterPhoto {
  constructor(private photoRepository: PhotoRepository) {}

  async execute({
    type,
    typeId,
    shiftId,
    linkDrive,
  }: RegisterPhotoInterfaceRequest): Promise<RegisterPhotoInterfaceResponse> {
    const photo = Photo.create({
      type,
      typeId: new UniqueEntityId(typeId),
      shiftId: new UniqueEntityId(shiftId),
      linkDrive,
    });

    await this.photoRepository.create(photo);

    return { photo };
  }
}
