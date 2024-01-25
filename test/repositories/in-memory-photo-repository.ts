import { PaginationParams } from "@/core/repositories/pagination-params";
import { PhotoRepository } from "@/domain/utils/application/repositories/photo-repository";
import { Photo } from "@/domain/utils/enterprise/entities/photo";

export class InMemoryPhotoRepository implements PhotoRepository {
  public items: Photo[] = [];

  async create(photo: Photo) {
    this.items.push(photo);
  }

  async findMany(
    { page }: PaginationParams,
    shiftId: string
  ): Promise<Photo[]> {
    const photo = this.items
      .filter((photo) => !shiftId || photo.shiftId.toString() === shiftId)
      .slice((page - 1) * 50, page * 50);

    return photo;
  }

  async delete(photo: Photo) {
    const itemIndex = this.items.findIndex((item) => item.id === photo.id);

    this.items.splice(itemIndex, 1);
  }

  async findById(photoId: string): Promise<Photo | null> {
    const photo = this.items.find((item) => item.id.toString() === photoId);

    if (!photo) return null;

    return photo;
  }
}
