/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { ShiftRepository } from "../repositories/shift-repository";

interface DeleteShiftInterfaceRequest {
  shiftId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteShiftInterfaceResponse {}

export class DeleteShift {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    shiftId,
    programmerType,
  }: DeleteShiftInterfaceRequest): Promise<DeleteShiftInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shiftId);

    if (!shift) throw new Error("Shift not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.shiftRepository.delete(shift);

    return {};
  }
}
