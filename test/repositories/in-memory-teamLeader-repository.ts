import { PaginationParams } from "@/core/repositories/pagination-params";
import { TeamLeaderRepository } from "@/domain/users/application/repositories/teamLeader-repository";
import { TeamLeader } from "@/domain/users/enterprise/entities/teamLeader";

export class InMemoryTeamLeaderRepository implements TeamLeaderRepository {
  public items: TeamLeader[] = [];

  async create(teamleader: TeamLeader) {
    this.items.push(teamleader);
  }

  async findMany(
    { page }: PaginationParams,
    email?: string,
    cpf?: number,
    name?: string
  ): Promise<TeamLeader[]> {
    const teamleaders = this.items
      .filter((teamleader) => !email || teamleader.email?.includes(email))
      .filter((teamleader) => !name || teamleader.name.includes(name))
      .filter((teamleader) => !cpf || teamleader.cpf === cpf)
      .slice((page - 1) * 50, page * 50);

    return teamleaders;
  }

  async save(teamleader: TeamLeader): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === teamleader.id);

    this.items[itemIndex] = teamleader;
  }

  async findById(TeamLeaderId: string): Promise<TeamLeader | null> {
    const TeamLeader = this.items.find(
      (item) => item.id.toString() === TeamLeaderId
    );

    if (!TeamLeader) return null;

    return TeamLeader;
  }
}
