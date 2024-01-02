import { PaginationParams } from "@/core/repositories/pagination-params";
import { Team } from "@/domain/production/team/enterprise/entities/team";

export interface TeamRepository {
  create(team: Team): Promise<void>;
  findMany(
    params: PaginationParams,
    supervisorId?: string,
    leaderId?: string,
    contract?: string,
    name?: string
  ): Promise<Array<Team>>;
  findById(teamId: string): Promise<Team | null>;
  delete(team: Team): Promise<void>;
  save(team: Team): Promise<void>;
}
