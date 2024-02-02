/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { Shift } from "../../enterprise/entities/shift";
import { ShiftRepository } from "../repositories/shift-repository";

interface GetShiftByTeamInterfaceRequest {
  page: number;
  teamId?: string;
}

type GetShiftByTeamInterfaceResponse = Either<null, { shifts: Array<Shift> }>;

export class GetShiftByTeam {
  constructor(private shiftRepository: ShiftRepository) {}

  async execute({
    page,
    teamId,
  }: GetShiftByTeamInterfaceRequest): Promise<GetShiftByTeamInterfaceResponse> {
    const shifts = await this.shiftRepository.findManyBetweenDates(
      new Date("1969-12-31"),
      new Date("2100-12-31"),
      { page },
      teamId
    );

    return right({ shifts });
  }
}
