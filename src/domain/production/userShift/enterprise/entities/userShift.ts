import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface UserShiftProps {
  userId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class UserShift extends Entity<UserShiftProps> {
  get shiftId() {
    return this.props.shiftId;
  }

  get userId() {
    return this.props.shiftId;
  }

  static create(props: UserShiftProps, id?: UniqueEntityId) {
    const userShift = new UserShift(
      {
        ...props,
      },
      id
    );

    return userShift;
  }
}
