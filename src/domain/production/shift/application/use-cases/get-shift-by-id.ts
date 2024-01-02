/* eslint-disable no-useless-constructor */
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface GetShiftByIdInterfaceRequest {
  shiftId: string;
}

interface GetShiftByIdInterfaceResponse {
  shift: Shift;
}

export class GetShiftByTeam {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    shiftId,
  }: GetShiftByIdInterfaceRequest): Promise<GetShiftByIdInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shiftId);

    if (!shift) throw new Error("Shift not found");

    return { shift };
  }
}
