import { Optinal } from "@/core/entities/types/optional";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "./user";

export interface TeamLeaderProps extends UserProps {
  teamId: UniqueEntityId;
}

export class TeamLeader extends User<TeamLeaderProps> {
  get teamId() {
    return this.props.teamId;
  }

  set teamId(teamId: UniqueEntityId) {
    this.props.teamId = teamId;
    this.touch();
  }

  static create(
    props: Optinal<TeamLeaderProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const teamLeader = new TeamLeader(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return teamLeader;
  }
}
