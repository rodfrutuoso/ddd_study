import { PaginationParams } from "@/core/repositories/pagination-params";
import { TeamRepository } from "@/domain/shifts/application/repositories/team-repository";
import { Team } from "@/domain/shifts/enterprise/entities/team";

export class InMemoryTeamRepository implements TeamRepository {
  public items: Team[] = [];
  async create(team: Team) {
    this.items.push(team);
  }

  async findMany(
    { page }: PaginationParams,
    supervisorId?: string,
    leaderId?: string,
    contract?: string,
    name?: string,
  ): Promise<Team[]> {
    const teams = this.items
      // eslint-disable-next-line prettier/prettier
      .filter((team) => !supervisorId || team.supervisorId?.toString() === supervisorId)
      .filter((team) => !leaderId || team.leaderId.toString() === leaderId)
      .filter((team) => !contract || team.contract === contract)
      .filter((team) => !name || team.name === name)
      .slice((page - 1) * 50, page * 50);

    return teams;
  }

  //  (teamId: string) namet team = this.items.find((item) => item.id.toString() === teamId);

  //     if (!team) return null;

  //     return team;
  //   }

  //   async delete(team: Team) {
  //     const itemIndex = this.items.findIndex((item) => item.id === team.id);

  //     this.items.splice(itemIndex, 1);
  //   }

  //   async save(team: Team) {
  //     const itemIndex = this.items.findIndex((item) => item.id === team.id);

  //     this.items[itemIndex] = team;
  //   }
}
