/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { UserNameId } from "@/core/entities/userNameId";
import { UniqueEntityId } from "../../../../../core/entities/unique-entity-id";
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";
import { SupervisorRepository } from "@/domain/users/application/repositories/supervisor-repository";
import { TeamLeaderRepository } from "@/domain/users/application/repositories/teamLeader-repository";
import { CoordinatorRepository } from "@/domain/users/application/repositories/coordinator-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface RegisterTeamInterfaceRequest {
  name: string;
  leaderId: string;
  supervisorId?: string;
  coordinatorId?: string;
  type: string;
  contract: string;
}

type RegisterTeamInterfaceResponse = Either<
  ResourceNotFoundError,
  { team: Team }
>;

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
    if (!leader)
      return left(new ResourceNotFoundError("Encarregado não encontrado"));

    let supervisor;
    if (supervisorId) {
      supervisor = await this.supervisorRepository.findById(supervisorId);
      if (!supervisor)
        return left(new ResourceNotFoundError("Supervisor não encontrado"));
    }

    let coordinator;
    if (coordinatorId) {
      coordinator = await this.coordinatorRepository.findById(coordinatorId);
      if (!coordinator)
        return left(new ResourceNotFoundError("Coordenador não encontrado"));
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

    return right({ team });
  }
}
