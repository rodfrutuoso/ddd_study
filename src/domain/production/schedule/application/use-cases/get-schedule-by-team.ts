/* eslint-disable no-useless-constructor */
import { Schedule } from "../../enterprise/entities/schedule";
import { ScheduleRepository } from "../repositories/schedule-repository";

interface GetScheduleByTeamInterfaceRequest {
  teamId: string;
  page: number;
}

interface GetScheduleByTeamInterfaceResponse {
  schedules: Array<Schedule>;
}

export class GetScheduleByTeam {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute({
    teamId,
    page,
  }: GetScheduleByTeamInterfaceRequest): Promise<GetScheduleByTeamInterfaceResponse> {
    const schedules = await this.scheduleRepository.findMany(
      { page },
      new Date("1900-01-01"),
      new Date("2100-01-01"),
      teamId
    );

    return { schedules };
  }
}
