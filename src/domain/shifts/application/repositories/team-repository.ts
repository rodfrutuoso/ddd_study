import { Team } from "@/domain/shifts/enterprise/entities/team";

export interface TeamRepository {
  create(team: Team): Promise<void>;
  //   findById(teamId: string): Promise<Team | null>;
  //   delete(team: Team): Promise<void>;
  //   save(team: Team): Promise<void>;
}
