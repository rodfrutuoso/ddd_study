import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Response, ResponseProps } from "./response";

export interface SMCResponseProps extends ResponseProps {
  cameraCode?: string;
  flaw?: string;
  shiftId: UniqueEntityId;
}

export class SMCResponse extends Response<SMCResponseProps> {
  get cameraCode() {
    return this.props.cameraCode;
  }

  get flaw() {
    return this.props.flaw;
  }

  get shiftId() {
    return this.props.shiftId;
  }

  static create(props: SMCResponseProps, id?: UniqueEntityId) {
    const smcResponse = new SMCResponse(
      {
        ...props,
      },
      id
    );

    return smcResponse;
  }
}
