/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { Team } from "../../enterprise/entities/team";
import { TeamRepository } from "../repositories/team-repository";

interface GetTeamByLeaderInterfaceRequest {
  page: number;
  supervisorId?: string;
  leaderId?: string;
  contract?: string;
  name?: string;
}

type GetTeamByLeaderInterfaceResponse = Either<
  null,
  {
    teams: Array<Team>;
  }
>;

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

    return right({ teams });
  }
}
