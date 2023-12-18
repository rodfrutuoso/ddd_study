import { Value } from "./value-objects/value";
import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface LaunchProps {
  value: Value;
  shiftId: UniqueEntityId;
  projectId: UniqueEntityId;
}

export class Launch extends Entity<LaunchProps> {
  get shiftId() {
    return this.props.shiftId.value;
  }

  get value() {
    return this.props.value.number;
  }

  get projectId() {
    return this.props.projectId;
  }

  set value(value: Value) {
    this.props.value = value;
  }

  static create(props: LaunchProps, id?: UniqueEntityId) {
    const launch = new Launch(
      {
        ...props,
        created_at: new Date(),
      },
      id,
    );

    return launch;
  }
}
