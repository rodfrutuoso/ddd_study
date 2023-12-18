import { Value } from "./value-objects/value";
import { Entity } from "../../core/entities/entity";

interface LaunchProps {
  serviceId: string;
  value: Value;
  shiftId: string;
  projectId: string;
}

export class Launch extends Entity<LaunchProps> {
  get shiftId() {
    return this.props.shiftId;
  }
}
