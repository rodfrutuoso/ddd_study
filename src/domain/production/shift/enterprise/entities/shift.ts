/* eslint-disable camelcase */
import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AggregateRoot } from "@/core/entities/aggregate-root";
import { Photo } from "@/domain/utils/enterprise/entities/photo";

export interface ShiftProps {
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
  photos: Photo[];
}

export class Shift extends AggregateRoot<ShiftProps> {
  get teamId() {
    return this.props.teamId;
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

  set odometer_start(odometer_start: number) {
    this.props.odometer_start = odometer_start;
  }

  get odometer_end() {
    return this.props.odometer_end;
  }

  set odometer_end(odometer_end: number) {
    this.props.odometer_end = odometer_end;
  }

  get vehicle_id() {
    return this.props.vehicle_id;
  }

  set vehicle_id(vehicle_id: UniqueEntityId) {
    this.props.vehicle_id = vehicle_id;
  }

  get created_at() {
    return this.props.created_at;
  }

  get photos() {
    return this.props.photos;
  }

  static create(
    props: Optinal<ShiftProps, "created_at" | "photos">,
    id?: UniqueEntityId
  ) {
    const shift = new Shift(
      {
        ...props,
        photos: props.photos ?? [],
        created_at: new Date(),
      },
      id
    );

    return shift;
  }
}
