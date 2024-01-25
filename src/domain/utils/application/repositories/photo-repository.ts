import { PaginationParams } from "@/core/repositories/pagination-params";
import { Photo } from "@/domain/utils/enterprise/entities/photo";

export interface PhotoRepository {
  create(photo: Photo): Promise<void>;
  findMany(params: PaginationParams, shiftId?: string): Promise<Array<Photo>>;
  delete(photo: Photo): Promise<void>;
  findById(photoId: string): Promise<Photo | null>;
}
