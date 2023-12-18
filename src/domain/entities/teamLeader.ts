import { Entity } from "../../core/entities/entity";
import { UniqueEntityId } from "../../core/entities/unique-entity-id";

interface TeamLeaderProps {
  name: string,
  cpf: number,
  email?: string,
  password: string,
  teamId: UniqueEntityId,
  type: string,
  deactivation_date?: Date
}

export class TeamLeader extends Entity<TeamLeaderProps> {
  
}
