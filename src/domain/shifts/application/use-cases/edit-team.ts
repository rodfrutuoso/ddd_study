/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { TeamRepository } from "../repositories/team-repository";
import { Team } from "../../enterprise/entities/team";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface EditTeamInterfaceRequest {
  teamId: string;
  programmerType: string;
  name?: string;
  leaderId?: string;
  supervisorId?: string;
  coordinatorId?: string;
  deactivation_date?: Date;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface EditTeamInterfaceResponse {
  team: Team;
}

export class EditTeam {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    teamId,
    programmerType,
    name,
    leaderId,
    supervisorId,
    coordinatorId,
    deactivation_date,
  }: EditTeamInterfaceRequest): Promise<EditTeamInterfaceResponse> {
    const team = await this.teamRepository.findById(teamId);

    if (!team) throw new Error("Team not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      throw new Error("Not authorized");

    team.name = name ?? team.name;
    team.leaderId = new UniqueEntityId(leaderId) ?? team.leaderId;
    team.supervisorId = new UniqueEntityId(supervisorId) ?? team.supervisorId;
    // eslint-disable-next-line prettier/prettier
    team.coordinatorId = new UniqueEntityId(coordinatorId) ?? team.coordinatorId;
    if (deactivation_date !== undefined) team.deactivation_date = new Date();

    await this.teamRepository.save(team);

    return { team };
  }
}
