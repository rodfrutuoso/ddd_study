import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface VehiclePhotoProps {
  photoId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class VehiclePhoto extends Entity<VehiclePhotoProps> {
  get shiftId() {
    return this.props.shiftId;
  }

  get photoId() {
    return this.props.photoId;
  }

  static create(props: VehiclePhotoProps, id?: UniqueEntityId) {
    const vehiclePhoto = new VehiclePhoto(
      {
        ...props,
      },
      id
    );

    return vehiclePhoto;
  }
}
