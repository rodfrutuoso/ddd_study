import { Entity } from "../../core/entities/entity";
import { Optinal } from "../../core/entities/types/optional";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface ShiftProps {
  teamId: UniqueEntityId;
  date: Date;
  shift_start: string;
  shift_end: string;
  transit_start?: number;
  transit_end?: number;
  odometer_start: number;
  odometer_end: number;
  vehicle_id: UniqueEntityId;
  created_at: Date;
}

export class Shift extends Entity<ShiftProps> {
  get teamId(){
    return this.props.teamId.value
  }

  get date(){
    return this.props.date
  }

  get shift_start(){
    return this.props.shift_start
  }

  static create(
    props: Optinal<ShiftProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const shift = new Shift(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return shift;
  }

}

