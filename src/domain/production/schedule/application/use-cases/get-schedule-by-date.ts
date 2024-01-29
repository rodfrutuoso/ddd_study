/* eslint-disable no-useless-constructor */
import { Schedule } from "../../enterprise/entities/schedule";
import { ScheduleRepository } from "../repositories/schedule-repository";

interface GetScheduleByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
  page: number;
}

interface GetScheduleByDateInterfaceResponse {
  schedules: Array<Schedule>;
}

export class GetScheduleByDate {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute({
    startDate,
    endDate,
    page,
  }: GetScheduleByDateInterfaceRequest): Promise<GetScheduleByDateInterfaceResponse> {
    const schedules = await this.scheduleRepository.findMany(
      { page },
      startDate,
      endDate
    );

    return { schedules };
  }
}
