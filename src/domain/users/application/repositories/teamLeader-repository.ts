import { PaginationParams } from "@/core/repositories/pagination-params";
import { TeamLeader } from "@/domain/users/enterprise/entities/teamLeader";

export interface TeamLeaderRepository {
  create(teamleader: TeamLeader): Promise<void>;
  findMany(
    params: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<Array<TeamLeader>>;
  save(teamleader: TeamLeader): Promise<void>;
  findById(teamleaderId: string): Promise<TeamLeader | null>;
}
