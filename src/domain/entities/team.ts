import { Entity } from "../../core/entities/entity";

interface TeamProps {
  name: string;
  leaderId: string;
  type: string;
  contract: string;
}

export class Team extends Entity<TeamProps> {
  
}
