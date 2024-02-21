import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface SmcPhotoProps {
  photoId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class SmcPhoto extends Entity<SmcPhotoProps> {
  get shiftId() {
    return this.props.shiftId;
  }

  get photoId() {
    return this.props.photoId;
  }

  static create(props: SmcPhotoProps, id?: UniqueEntityId) {
    const smcPhoto = new SmcPhoto(
      {
        ...props,
      },
      id
    );

    return smcPhoto;
  }
}
