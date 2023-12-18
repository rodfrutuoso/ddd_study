import { Entity } from "../../core/entities/entity";
import { Optinal } from "../../core/entities/types/optional";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface TeamProps {
  name: string;
  leaderId: UniqueEntityId;
  supervisorId?: UniqueEntityId;
  coordinatorId?: UniqueEntityId;
  type: string;
  contract: string;
  deactivation_date?: Date;
  created_at: Date;
}

export class Team extends Entity<TeamProps> {
  static create(
    props: Optinal<TeamProps, "created_at">,
    id?: UniqueEntityId
  ) {
    const team = new Team(
      {
        ...props,
        created_at: new Date(),
      },
      id
    );

    return team;
  }
}
