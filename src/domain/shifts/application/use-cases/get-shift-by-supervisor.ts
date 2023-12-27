/* eslint-disable no-useless-constructor */
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";
import { TeamRepository } from "../repositories/team-repository";

interface GetShiftBySueprvisorInterfaceRequest {
  page: number;
  supervisorId: string;
}

interface GetShiftBySupervisorInterfaceResponse {
  shifts: Array<Shift>;
}

export class GetShiftBySupervisor {
  constructor(
    private shiftRepository: ShiftRepository,
    private teamRepository: TeamRepository
  ) {}

  async execute({
    page,
    supervisorId,
  }: GetShiftBySueprvisorInterfaceRequest): Promise<GetShiftBySupervisorInterfaceResponse> {
    const teams = await this.teamRepository.findMany({ page }, supervisorId);

    const teamsId = teams.map((team) => team.id.toString());

    const shifts = await this.shiftRepository.findManyBetweenDates(
      new Date("1969-12-31"),
      new Date("2100-12-31"),
      { page },
      undefined,
      teamsId
    );

    return { shifts };
  }
}
