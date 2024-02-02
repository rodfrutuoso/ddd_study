/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { TeamRepository } from "../repositories/team-repository";
import { Team } from "../../enterprise/entities/team";
import { UserNameId } from "@/core/entities/userNameId";
import { SupervisorRepository } from "@/domain/users/application/repositories/supervisor-repository";
import { TeamLeaderRepository } from "@/domain/users/application/repositories/teamLeader-repository";
import { CoordinatorRepository } from "@/domain/users/application/repositories/coordinator-repository";
import { Either, left, right } from "@/core/either";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditTeamInterfaceRequest {
  teamId: string;
  programmerType: string;
  name?: string;
  leaderId?: string;
  supervisorId?: string;
  coordinatorId?: string;
  deactivation_date?: Date;
}

type EditTeamInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { team: Team }
>;

export class EditTeam {
  constructor(
    private teamRepository: TeamRepository,
    private supervisorRepository: SupervisorRepository,
    private teamleaderRepository: TeamLeaderRepository,
    private coordinatorRepository: CoordinatorRepository
  ) {}

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

    if (!team) return left(new ResourceNotFoundError("Equipe não encontrada"));

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    // verifying if teamLeader, Supervisor and coordinator Id's are valid and geting their names
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

    let teamLeader;
    if (leaderId) {
      teamLeader = await this.teamleaderRepository.findById(leaderId);
      if (!teamLeader)
        return left(new ResourceNotFoundError("Encarregado não econtrado"));
    }

    team.name = name ?? team.name;
    team.leaderId =
      leaderId === undefined
        ? team.leaderId
        : new UserNameId(teamLeader?.name, teamLeader?.id);
    team.supervisorId =
      supervisorId === undefined
        ? team.supervisorId
        : new UserNameId(supervisor?.name, supervisor?.id);
    // eslint-disable-next-line prettier/prettier
    team.coordinatorId =
      coordinatorId === undefined
        ? team.coordinatorId
        : new UserNameId(coordinator?.name, coordinator?.id);
    if (deactivation_date !== undefined) team.deactivation_date = new Date();

    await this.teamRepository.save(team);

    return right({ team });
  }
}
