import { Entity } from "@/core/entities/entity";
import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface VehicleProps {
  teamId: UniqueEntityId;
  plate: string;
  type: string;
  created_at: Date;
}

export class Vehicle extends Entity<VehicleProps> {
  get teamId() {
    return this.props.teamId;
  }

  set teamId(teamId: UniqueEntityId) {
    this.props.teamId = teamId;
  }

  get plate() {
    return this.props.plate;
  }

  get type() {
    return this.props.type;
  }

  get created_at() {
    return this.props.created_at;
  }

  static create(
    props: Optinal<VehicleProps, "created_at">,
    id?: UniqueEntityId,
  ) {
    const vehicle = new Vehicle(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    );

    return vehicle;
  }
}
