/* eslint-disable no-useless-constructor */
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";

interface GetTeamByTeamInterfaceRequest {
  page: number;
  supervisorId?: string;
  leaderId?: string;
  contract?: string;
  name?: string;
}

interface GetTeamByTeamInterfaceResponse {
  teams: Array<Team>;
}

export class GetTeamBySupervisor {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    page,
    supervisorId,
    leaderId,
    contract,
    name,
  }: GetTeamByTeamInterfaceRequest): Promise<GetTeamByTeamInterfaceResponse> {
    const teams = await this.teamRepository.findMany(
      { page },
      supervisorId,
      leaderId,
      contract,
      name,
    );

    return { teams };
  }
}
