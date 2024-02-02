/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { Schedule } from "../../enterprise/entities/schedule";
import { ScheduleRepository } from "../repositories/schedule-repository";

interface GetScheduleByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
  page: number;
}

type GetScheduleByDateInterfaceResponse = Either<
  null,
  { schedules: Array<Schedule> }
>;

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

    return right({ schedules });
  }
}
