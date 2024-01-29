import { PaginationParams } from "@/core/repositories/pagination-params";
import { ScheduleRepository } from "@/domain/production/schedule/application/repositories/schedule-repository";
import { Schedule } from "@/domain/production/schedule/enterprise/entities/schedule";

export class InMemoryScheduleRepository implements ScheduleRepository {
  public items: Schedule[] = [];
  async findMany(
    { page }: PaginationParams,
    startDate: Date,
    endDate: Date,
    teamId?: string,
    projectId?: string
  ): Promise<Schedule[]> {
    const schedules = this.items
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .filter((shift) => shift.date >= startDate && shift.date <= endDate)
      .filter((schedule) => !teamId || schedule.teamId.toString() === teamId)
      .filter(
        (schedule) => !projectId || schedule.projectId.toString() === projectId
      )
      .slice((page - 1) * 50, page * 50);

    return schedules;
  }

  async create(schedule: Schedule) {
    this.items.push(schedule);
  }

  async delete(schedule: Schedule | undefined) {
    if (schedule === undefined) {
      this.items = [];
    } else {
      const itemIndex = this.items.findIndex((item) => item.id === schedule.id);

      this.items.splice(itemIndex, 1);
    }
  }

  async findById(scheduleId: string): Promise<Schedule | null> {
    const schedule = this.items.find(
      (item) => item.id.toString() === scheduleId
    );

    if (!schedule) return null;

    return schedule;
  }
}
