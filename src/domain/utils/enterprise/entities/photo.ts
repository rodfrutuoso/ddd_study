/* eslint-disable camelcase */
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface PhotoProps {
  // type?: string;
  // typeId?: UniqueEntityId;
  shiftId: UniqueEntityId;
  linkDrive: string;
}

export class Photo extends Entity<PhotoProps> {
  // get type() {
  //   return this.props.type;
  // }

  // get typeId() {
  //   return this.props.typeId;
  // }

  get shiftId() {
    return this.props.shiftId;
  }

  get linkDrive() {
    return this.props.linkDrive;
  }

  static create(props: PhotoProps, id?: UniqueEntityId) {
    const photo = new Photo(
      {
        ...props,
      },
      id
    );

    return photo;
  }
}
