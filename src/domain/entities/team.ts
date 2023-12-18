import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface TeamProps {
  name: string;
  leaderId: UniqueEntityId;
  supervisorId?: UniqueEntityId;
  coordinatorId?: UniqueEntityId;
  type: string;
  contract: string;
  deactivation_date?: Date;
}

export class Team extends Entity<TeamProps> {
  
}
