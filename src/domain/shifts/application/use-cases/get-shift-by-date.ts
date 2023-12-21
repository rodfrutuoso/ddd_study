/* eslint-disable no-useless-constructor */
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface GetShiftByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
  page: number;
}

type GetShiftByDateInterfaceResponse = Array<Shift>;

export class GetShiftByDate {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    startDate,
    endDate,
    page,
  }: GetShiftByDateInterfaceRequest): Promise<GetShiftByDateInterfaceResponse> {
    const shift = await this.shiftRepository.findManyBetweenDates(
      startDate,
      endDate,
      { page },
    );

    return shift;
  }
}
