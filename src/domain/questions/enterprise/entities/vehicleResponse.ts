import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Response, ResponseProps } from "./response";

export interface VehicleResponseProps extends ResponseProps {
  vehicleId: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class VehicleResponse extends Response<VehicleResponseProps> {
  get vehicleId() {
    return this.props.vehicleId;
  }

  get shiftId() {
    return this.props.shiftId;
  }

  static create(props: VehicleResponseProps, id?: UniqueEntityId) {
    const vehicleResponse = new VehicleResponse(
      {
        ...props,
      },
      id
    );

    return vehicleResponse;
  }
}
