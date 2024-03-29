import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface VehicleProps {
  teamId?: UniqueEntityId;
  plate: string;
  type: string;
  created_at: Date;
}

export class Vehicle extends Entity<VehicleProps> {
  get teamId(): UniqueEntityId | undefined {
    return this.props.teamId;
  }

  set teamId(teamId: UniqueEntityId | undefined) {
    this.props.teamId = teamId;
  }

  get plate() {
    return this.props.plate;
  }

  get type() {
    return this.props.type;
  }

  set type(type: string) {
    this.props.type = type;
  }

  get created_at() {
    return this.props.created_at;
  }

  static create(
    props: Optinal<VehicleProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const vehicle = new Vehicle(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return vehicle;
  }
}
