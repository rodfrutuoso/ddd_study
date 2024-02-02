/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { ShiftRepository } from "../repositories/shift-repository";
import { Shift } from "../../enterprise/entities/shift";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditShiftInterfaceRequest {
  shiftId: string;
  programmerType: string;
  odometer_end?: number;
  odometer_start?: number;
  vehicle_id?: string;
}

type EditShiftInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { shift: Shift }
>;

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

    if (!shift) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    shift.odometer_end = odometer_end ?? shift.odometer_end;
    shift.odometer_start = odometer_start ?? shift.odometer_start;
    shift.vehicle_id = new UniqueEntityId(vehicle_id) ?? shift.vehicle_id;

    await this.shiftRepository.save(shift);

    return right({ shift });
  }
}
