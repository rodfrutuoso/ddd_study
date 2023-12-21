/* eslint-disable no-useless-constructor */
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface GetShiftByDateInterfaceRequest {
  startDate: Date;
  endDate: Date;
}

type GetShiftByDateInterfaceResponse = Array<Shift> | undefined;

export class GetShiftByDate {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    startDate,
    endDate,
  }: GetShiftByDateInterfaceRequest): Promise<GetShiftByDateInterfaceResponse> {
    const shift = await this.shiftRepository.findBetweenDates(
      startDate,
      endDate,
    );

    // if (!shift || shift.length < 1) {
    //   throw new Error("No shifts between those dates");
    // }

    return shift;
  }
}
