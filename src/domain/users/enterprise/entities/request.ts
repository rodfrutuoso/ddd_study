import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export interface RequestProps extends UserProps {
  teamId?: UniqueEntityId;
}

export class Request extends User<RequestProps> {
  static create(
    props: Optinal<RequestProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const request = new Request(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return request;
  }
}
