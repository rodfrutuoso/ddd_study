import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

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
  get teamId() {
    return this.props.teamId.value;
  }

  get date() {
    return this.props.date;
  }

  get shift_end() {
    return this.props.shift_end;
  }

  get shift_start() {
    return this.props.shift_start;
  }

  get transit_start() {
    return this.props.transit_start;
  }

  get transit_end() {
    return this.props.transit_end;
  }

  get odometer_start() {
    return this.props.odometer_start;
  }

  get odometer_end() {
    return this.props.odometer_end;
  }

  get vehicle_id() {
    return this.props.vehicle_id.value;
  }

  get created_at() {
    return this.props.created_at;
  }

  set vehicle_id(vehicle_id: UniqueEntityId){
    this.props.vehicle_id = vehicle_id
  }

  set odometer_end(odometer_end: UniqueEntityId){
    this.props.odometer_end = odometer_end
  }

  set odometer_start(odometer_start: UniqueEntityId){
    this.props.odometer_start = odometer_start
  }

  static create(props: Optinal<ShiftProps, "created_at">, id?: UniqueEntityId) {
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
