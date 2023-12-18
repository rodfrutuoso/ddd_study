import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface ShiftProps {
  teamId: UniqueEntityId;
  date: Date;
  shift_start: string;
  shift_end: string;
  transit_start?: string;
  transit_end?: string;
  odometer_start: string;
  odometer_end: string;
  vehicle_id: UniqueEntityId;
}

export class Shift extends Entity<ShiftProps> {
  get teamId(){
    return this.props.teamId
  }

  get date(){
    return this.props.date
  }

}
