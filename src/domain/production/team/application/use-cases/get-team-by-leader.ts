/* eslint-disable no-useless-constructor */
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";

interface GetTeamByLeaderInterfaceRequest {
  page: number;
  supervisorId?: string;
  leaderId?: string;
  contract?: string;
  name?: string;
}

interface GetTeamByLeaderInterfaceResponse {
  teams: Array<Team>;
}

export class GetTeamByLeader {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    page,
    supervisorId,
    leaderId,
    contract,
    name,
  }: GetTeamByLeaderInterfaceRequest): Promise<GetTeamByLeaderInterfaceResponse> {
    const teams = await this.teamRepository.findMany(
      { page },
      supervisorId,
      leaderId,
      contract,
      name
    );

    return { teams };
  }
}
