/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UserNameId } from "@/core/entities/userNameId";
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";
import { SupervisorRepository } from "@/domain/users/application/repositories/supervisor-repository";
import { TeamLeaderRepository } from "@/domain/users/application/repositories/teamLeader-repository";
import { CoordinatorRepository } from "@/domain/users/application/repositories/coordinator-repository";

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
  constructor(
    private teamRepository: TeamRepository,
    private supervisorRepository: SupervisorRepository,
    private teamleaderRepository: TeamLeaderRepository,
    private coordinatorRepository: CoordinatorRepository
  ) {}

  async execute({
    name,
    leaderId,
    supervisorId,
    coordinatorId,
    type,
    contract,
  }: RegisterTeamInterfaceRequest): Promise<RegisterTeamInterfaceResponse> {
    const leader = await this.teamleaderRepository.findById(leaderId);
    if (!leader) throw new Error("Leader not found");

    let supervisor;
    if (supervisorId) {
      supervisor = await this.supervisorRepository.findById(supervisorId);
      if (!supervisor) throw new Error("Supervisor not found");
    }

    let coordinator;
    if (coordinatorId) {
      coordinator = await this.coordinatorRepository.findById(coordinatorId);
      if (!coordinator) throw new Error("Coordinator not found");
    }

    const team = Team.create({
      name,
      leaderId: new UserNameId(leader.name, new UniqueEntityId(leaderId)),
      supervisorId: new UserNameId(
        supervisor?.name,
        supervisorId === undefined
          ? undefined
          : new UniqueEntityId(supervisorId)
      ),
      coordinatorId: new UserNameId(
        coordinator?.name,
        coordinatorId === undefined
          ? undefined
          : new UniqueEntityId(coordinatorId)
      ),
      type,
      contract,
    });

    await this.teamRepository.create(team);

    return { team };
  }
}
