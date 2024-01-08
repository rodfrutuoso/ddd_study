import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Response, ResponseProps } from "../../../enterprise/entities/response";

export interface EPIResponseProps extends ResponseProps {
  userId?: UniqueEntityId;
  shiftId: UniqueEntityId;
}

export class EPIResponse extends Response<EPIResponseProps> {
  get userId() {
    return this.props.userId;
  }

  get shiftId() {
    return this.props.shiftId;
  }

  static create(props: EPIResponseProps, id?: UniqueEntityId) {
    const epiResponse = new EPIResponse(
      {
        ...props,
      },
      id
    );

    return epiResponse;
  }
}
