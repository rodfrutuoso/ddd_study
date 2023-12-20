import { LaunchRepository } from "@/domain/shifts/application/repositories/launch-repository";
import { Launch } from "@/domain/shifts/enterprise/entities/launch";

export class InMemorylaunchRepository implements LaunchRepository {
  public items: Launch[] = [];
  async create(launch: Launch) {
    this.items.push(launch);
  }

  async findById(launchId: string) {
    const launch = this.items.find((item) => item.id.toString() === launchId);

    if (!launch) return null;

    return launch;
  }

  async delete(launch: Launch) {
    const itemIndex = this.items.findIndex((item) => item.id === launch.id);

    this.items.splice(itemIndex, 1);
  }
}
