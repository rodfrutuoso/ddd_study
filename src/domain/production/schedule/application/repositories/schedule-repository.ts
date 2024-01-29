import { PaginationParams } from "@/core/repositories/pagination-params";
import { Schedule } from "@/domain/production/schedule/enterprise/entities/schedule";

export interface ScheduleRepository {
  create(schedule: Schedule): Promise<void>;
  findMany(
    params: PaginationParams,
    startDate: Date,
    endDate: Date,
    teamId?: string,
    projectId?: string
  ): Promise<Array<Schedule>>;
  delete(projectShifit: Schedule | undefined): Promise<void>;
  findById(projectShifitId: string): Promise<Schedule | null>;
}
