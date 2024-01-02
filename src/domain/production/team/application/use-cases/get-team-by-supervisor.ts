/* eslint-disable no-useless-constructor */
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";

interface GetTeamBySupervisorInterfaceRequest {
  page: number;
  supervisorId?: string;
  leaderId?: string;
  contract?: string;
  name?: string;
}

interface GetTeamBySupervisorInterfaceResponse {
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
  }: GetTeamBySupervisorInterfaceRequest): Promise<GetTeamBySupervisorInterfaceResponse> {
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
