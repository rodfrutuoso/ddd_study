/* eslint-disable no-useless-constructor */
import { PhotoRepository } from "../repositories/photo-repository";
import { Photo } from "../../enterprise/entities/photo";

interface GetPhotoByShiftInterfaceRequest {
  shiftId: string;
  page: number;
}

interface GetPhotoByShiftInterfaceResponse {
  photos: Array<Photo>;
}

export class GetPhotoByShift {
  constructor(private photoRepository: PhotoRepository) {}

  async execute({
    shiftId,
    page,
  }: GetPhotoByShiftInterfaceRequest): Promise<GetPhotoByShiftInterfaceResponse> {
    const photos = await this.photoRepository.findMany({ page }, shiftId);

    return { photos };
  }
}
