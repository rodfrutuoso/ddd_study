import { Entity } from "../../core/entities/entity";
import { Optinal } from "../../core/entities/types/optional";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface TeamLeaderProps {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  teamId: UniqueEntityId;
  type: string;
  deactivation_date?: Date;
  created_at: Date;
  created_by: UniqueEntityId;
  updated_at: Date;
}

export class TeamLeader extends Entity<TeamLeaderProps> {
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
