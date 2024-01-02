/* eslint-disable no-useless-constructor */
import { Shift } from "../../enterprise/entities/shift";
import { Team } from "../../../team/enterprise/entities/team";
import { ShiftRepository } from "../repositories/shift-repository";
import { TeamRepository } from "../../../team/application/repositories/team-repository";

interface GetShiftByContractInterfaceRequest {
  page: number;
  contract: string;
}

interface GetShiftByContractInterfaceResponse {
  shifts: Array<Shift>;
}

export class GetShiftByContract {
  constructor(
    private shiftRepository: ShiftRepository,
    private teamRepository: TeamRepository
  ) {}

  async execute({
    page,
    contract,
  }: GetShiftByContractInterfaceRequest): Promise<GetShiftByContractInterfaceResponse> {
    const teams: Team[] = [];
    let count = 1;

    while (true) {
      const teamsSearch = await this.teamRepository.findMany(
        { page: count },
        undefined,
        undefined,
        contract
      );

      teamsSearch.map((team) => teams.push(team));
      count++;

      if (teamsSearch.length === 0) break;
    }

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
