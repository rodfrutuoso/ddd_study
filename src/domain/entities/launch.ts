import { Value } from "./value-objects/value";
import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface LaunchProps {
  serviceId: UniqueEntityId;
  value: Value;
  shiftId: UniqueEntityId;
  projectId: UniqueEntityId;
}

export class Launch extends Entity<LaunchProps> {
  get shiftId() {
    return this.props.shiftId;
  }
}
