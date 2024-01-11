import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export interface OperationalProps extends UserProps {
  teamId: UniqueEntityId;
}

export class Operational extends User<OperationalProps> {
  get teamId() {
    return this.props.teamId;
  }

  set teamId(teamId: UniqueEntityId) {
    this.props.teamId = teamId;
    this.touch();
  }

  static create(
    props: Optinal<OperationalProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const operational = new Operational(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return operational;
  }
}
