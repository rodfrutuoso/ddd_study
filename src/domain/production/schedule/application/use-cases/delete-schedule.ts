/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, left, right } from "@/core/either";
import { ScheduleRepository } from "../repositories/schedule-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteScheduleInterfaceRequest {
  scheduleId?: string;
  programmerType: string;
}

type DeleteScheduleInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

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
      return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    if (schedule === undefined) {
      await this.scheduleRepository.delete(undefined);
    }
    await this.scheduleRepository.delete(schedule);

    return right({});
  }
}
