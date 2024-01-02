import { PaginationParams } from "@/core/repositories/pagination-params";
import { Launch } from "@/domain/production/launch/enterprise/entities/launch";

export interface LaunchRepository {
  create(launch: Launch): Promise<void>;
  findById(launchId: string): Promise<Launch | null>;
  delete(launch: Launch): Promise<void>;
  save(launch: Launch): Promise<void>;
  findMany(
    params: PaginationParams,
    servicesId?: Array<string>,
    projectShiftsId?: Array<string>
  ): Promise<Array<Launch>>;
}
