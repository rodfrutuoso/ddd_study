/* eslint-disable no-useless-constructor */
/* eslint-disable camelcase */
import { Either, left, right } from "@/core/either";
import { TeamRepository } from "../repositories/team-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface DeleteTeamInterfaceRequest {
  teamId: string;
  programmerType: string;
}

type DeleteTeamInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  Record<string, never>
>;

export class DeleteTeam {
  constructor(private teamRepository: TeamRepository) {}

  async execute({
    teamId,
    programmerType,
  }: DeleteTeamInterfaceRequest): Promise<DeleteTeamInterfaceResponse> {
    const team = await this.teamRepository.findById(teamId);

    if (!team) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÂO")
      return left(new NotAuthorizedError());

    await this.teamRepository.delete(team);

    return right({});
  }
}
