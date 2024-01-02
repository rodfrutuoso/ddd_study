/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface OpenShiftInterfaceRequest {
  teamId: string;
  date: Date;
  shift_start: string;
  shift_end: string;
  transit_start?: number;
  transit_end?: number;
  odometer_start: number;
  odometer_end: number;
  vehicle_id: string;
}

interface OpenShiftInterfaceResponse {
  shift: Shift;
}

export class OpenShift {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    teamId,
    date,
    odometer_end,
    odometer_start,
    shift_end,
    shift_start,
    vehicle_id,
  }: OpenShiftInterfaceRequest): Promise<OpenShiftInterfaceResponse> {
    // const shift = new Shift({ teamId, date });
    const shift = Shift.create({
      teamId: new UniqueEntityId(teamId),
      odometer_end,
      odometer_start,
      shift_end,
      shift_start,
      vehicle_id: new UniqueEntityId(vehicle_id),
      date,
    });

    await this.shiftRepository.create(shift);

    return { shift };
  }
}
