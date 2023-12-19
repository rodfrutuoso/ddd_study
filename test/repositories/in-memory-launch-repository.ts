import { LaunchRepository } from "@/domain/shifts/application/repositories/launch-repository";
import { Launch } from "@/domain/shifts/enterprise/entities/launch";

export class InMemorylaunchRepository implements LaunchRepository {
  public items: Launch[] = [];

  async create(launch: Launch) {
    this.items.push(launch);
  }
}
