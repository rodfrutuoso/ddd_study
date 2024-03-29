/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface GetShiftByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
  page: number;
  teamId?: string;
}

type GetShiftByDateInterfaceResponse = Either<null, { shifts: Array<Shift> }>;

export class GetShiftByDate {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    startDate,
    endDate,
    page,
    teamId,
  }: GetShiftByDateInterfaceRequest): Promise<GetShiftByDateInterfaceResponse> {
    const shifts = await this.shiftRepository.findManyBetweenDates(
      startDate,
      endDate,
      { page },
      teamId
    );

    return right({ shifts });
  }
}
