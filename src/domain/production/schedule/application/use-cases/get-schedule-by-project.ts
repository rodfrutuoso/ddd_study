/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { Schedule } from "../../enterprise/entities/schedule";
import { ScheduleRepository } from "../repositories/schedule-repository";

interface GetScheduleByProjectInterfaceRequest {
  projectId: string;
  page: number;
}

type GetScheduleByProjectInterfaceResponse = Either<
  null,
  { schedules: Array<Schedule> }
>;

export class GetScheduleByProject {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute({
    projectId,
    page,
  }: GetScheduleByProjectInterfaceRequest): Promise<GetScheduleByProjectInterfaceResponse> {
    const schedules = await this.scheduleRepository.findMany(
      { page },
      new Date("1900-01-01"),
      new Date("2100-01-01"),
      undefined,
      projectId
    );

    return right({ schedules });
  }
}
