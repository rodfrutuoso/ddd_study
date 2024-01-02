import { Value } from "./value-objects/value";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

export interface LaunchProps {
  value: Value;
  serviceId: UniqueEntityId;
  projectShiftId: UniqueEntityId;
}

export class Launch extends Entity<LaunchProps> {
  get serviceId() {
    return this.props.serviceId;
  }

  get value() {
    return this.props.value;
  }

  set value(value: Value) {
    this.props.value = value;
  }

  get projectShiftId() {
    return this.props.projectShiftId;
  }

  static create(props: LaunchProps, id?: UniqueEntityId) {
    const launch = new Launch(
      {
        ...props,
      },
      id
    );

    return launch;
  }
}
