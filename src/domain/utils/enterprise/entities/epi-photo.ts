import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface EpiPhotoProps {
  photoId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class EpiPhoto extends Entity<EpiPhotoProps> {
  get shiftId() {
    return this.props.shiftId;
  }

  get photoId() {
    return this.props.photoId;
  }

  static create(props: EpiPhotoProps, id?: UniqueEntityId) {
    const epiPhoto = new EpiPhoto(
      {
        ...props,
      },
      id
    );

    return epiPhoto;
  }
}
