import { TeamRepository } from "@/domain/shifts/application/repositories/team-repository";
import { Team } from "@/domain/shifts/enterprise/entities/team";

export class InMemoryTeamRepository implements TeamRepository {
  public items: Team[] = [];
  async create(team: Team) {
    this.items.push(team);
  }

  //   async findById(teamId: string) {
  //     const team = this.items.find((item) => item.id.toString() === teamId);

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
