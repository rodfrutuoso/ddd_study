/* eslint-disable no-useless-constructor */
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface GetShiftByTeamInterfaceRequest {
  teamId: string;
}

interface GetShiftByTeamInterfaceResponse {
  shift: Shift;
}

export class GetShiftByTeam {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    teamId,
  }: GetShiftByTeamInterfaceRequest): Promise<GetShiftByTeamInterfaceResponse> {
    const shift = await this.shiftRepository.findByTeam(teamId);

    if (!shift) throw new Error("Shift not found");

    return { shift };
  }
}
