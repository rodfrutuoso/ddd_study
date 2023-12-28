/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { TeamRepository } from "../repositories/team-repository";

interface DeleteTeamInterfaceRequest {
  teamId: string;
  programmerType: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DeleteTeamInterfaceResponse {}

export class DeleteTeam {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    teamId,
    programmerType,
  }: DeleteTeamInterfaceRequest): Promise<DeleteTeamInterfaceResponse> {
    const team = await this.teamRepository.findById(teamId);

    if (!team) throw new Error("Team not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    await this.teamRepository.delete(team);

    return {};
  }
}
