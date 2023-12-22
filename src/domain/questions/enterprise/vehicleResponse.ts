import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Response, ResponseProps } from "./response";

export interface VehicleResponseProps extends ResponseProps {
  vehicleId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class Vehicle extends Response<VehicleResponseProps> {
  get vehicleId() {
    return this.props.vehicleId;
  }

  get shiftId() {
    return this.props.shiftId;
  }

  static create(props: VehicleResponseProps, id?: UniqueEntityId) {
    const shift = new Vehicle(
      {
        ...props,
      },
      id,
    );

    return shift;
  }
}
