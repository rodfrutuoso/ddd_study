/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { Schedule } from "../../enterprise/entities/schedule";
import { ScheduleRepository } from "../repositories/schedule-repository";

interface RegisterScheduleInterface {
  teamId: string;
  projectId: string;
  date: Date;
}

interface RegisterScheduleInterfaceRequest {
  schedules: RegisterScheduleInterface[];
}
interface RegisterScheduleInterfaceResponse {
  schedule: Schedule[];
}

export class RegisterSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute({
    schedules,
  }: RegisterScheduleInterfaceRequest): Promise<RegisterScheduleInterfaceResponse> {
    const schedule: Schedule[] = [];
    await schedules.map(async (sche) => {
      const scheduleInMemory = Schedule.create({
        teamId: new UniqueEntityId(sche.teamId),
        projectId: new UniqueEntityId(sche.projectId),
        date: sche.date,
      });

      schedule.push(scheduleInMemory);

      await this.scheduleRepository.create(scheduleInMemory);
    });

    return { schedule };
  }
}
