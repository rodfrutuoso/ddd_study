import { PaginationParams } from "@/core/repositories/pagination-params";
import { LaunchRepository } from "@/domain/production/launch/application/repositories/launch-repository";
import { Launch } from "@/domain/production/launch/enterprise/entities/launch";

export class InMemoryLaunchRepository implements LaunchRepository {
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

  async save(launch: Launch) {
    const itemIndex = this.items.findIndex((item) => item.id === launch.id);

    this.items[itemIndex] = launch;
  }

  async findMany(
    { page }: PaginationParams,
    servicesId?: Array<string>,
    projectShiftsId?: Array<string>
  ): Promise<Launch[]> {
    const launchs = this.items
      .filter(
        (projectshift) =>
          servicesId === undefined ||
          servicesId.includes(projectshift.serviceId.toString())
      )
      .filter(
        (projectshift) =>
          projectShiftsId === undefined ||
          projectShiftsId.includes(projectshift.projectShiftId.toString())
      )
      .slice((page - 1) * 50, page * 50);

    return launchs;
  }
}
