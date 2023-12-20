/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ShiftRepository } from "../repositories/shift-repository";

interface EditShiftInterfaceRequest {
  shiftId: string;
  programmerType: string;
  odometer_end?: number;
  odometer_start?: number;
  vehicle_id?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditShiftInterfaceResponse {}

export class EditShift {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    shiftId,
    programmerType,
    odometer_end,
    odometer_start,
    vehicle_id,
  }: EditShiftInterfaceRequest): Promise<EditShiftInterfaceResponse> {
    const shift = await this.shiftRepository.findById(shiftId);

    if (!shift) throw new Error("Shift not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    shift.odometer_end = odometer_end ?? shift.odometer_end;
    shift.odometer_start = odometer_start ?? shift.odometer_start;
    shift.vehicle_id = new UniqueEntityId(vehicle_id) ?? shift.vehicle_id;

    await this.shiftRepository.save(shift);

    return {};
  }
}
