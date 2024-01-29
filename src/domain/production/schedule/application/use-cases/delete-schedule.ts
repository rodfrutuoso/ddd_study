/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ScheduleRepository } from "../repositories/schedule-repository";

interface DeleteScheduleInterfaceRequest {
  scheduleId?: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteScheduleInterfaceResponse {}

export class DeleteSchedule {
  constructor(private scheduleRepository: ScheduleRepository) {}

  async execute({
    scheduleId,
    programmerType,
  }: DeleteScheduleInterfaceRequest): Promise<DeleteScheduleInterfaceResponse> {
    const schedule =
      scheduleId === undefined
        ? undefined
        : await this.scheduleRepository.findById(scheduleId);

    if (!schedule && schedule !== undefined)
      throw new Error("Schedule not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    if (schedule === undefined) {
      await this.scheduleRepository.delete(undefined);
    }
    await this.scheduleRepository.delete(schedule);

    return {};
  }
}
