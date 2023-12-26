/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id";
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";

interface RegisterTeamInterfaceRequest {
  name: string;
  leaderId: string;
  supervisorId?: string;
  coordinatorId?: string;
  type: string;
  contract: string;
}

interface RegisterTeamInterfaceResponse {
  team: Team;
}

export class RegisterTeam {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    name,
    leaderId,
    supervisorId,
    coordinatorId,
    type,
    contract,
  }: RegisterTeamInterfaceRequest): Promise<RegisterTeamInterfaceResponse> {
    const team = Team.create({
      name,
      leaderId: new UniqueEntityId(leaderId),
      supervisorId:
        supervisorId === undefined
          ? undefined
          : new UniqueEntityId(supervisorId),
      coordinatorId:
        coordinatorId === undefined
          ? undefined
          : new UniqueEntityId(coordinatorId),
      type,
      contract,
    });

    await this.teamRepository.create(team);

    return { team };
  }
}
