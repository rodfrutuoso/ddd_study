import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AprPhotoProps {
  photoId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class AprPhoto extends Entity<AprPhotoProps> {
  get shiftId() {
    return this.props.shiftId;
  }

  get photoId() {
    return this.props.photoId;
  }

  static create(props: AprPhotoProps, id?: UniqueEntityId) {
    const aprPhoto = new AprPhoto(
      {
        ...props,
      },
      id
    );

    return aprPhoto;
  }
}
