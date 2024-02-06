/* eslint-disable no-useless-constructor */
import { TeamLeaderRepository } from "../repositories/teamLeader-repository";
import { TeamLeader } from "../../enterprise/entities/teamLeader";
import { Either, right } from "@/core/either";

interface GetTeamLeaderByNameInterfaceRequest {
  name: string;
  page: number;
}

type GetTeamLeaderByNameInterfaceResponse = Either<
  null,
  { teamleader: Array<TeamLeader> }
>;

export class GetTeamLeaderByName {
  constructor(private teamleaderRepository: TeamLeaderRepository) {}

  async execute({
    name,
    page,
  }: GetTeamLeaderByNameInterfaceRequest): Promise<GetTeamLeaderByNameInterfaceResponse> {
    const teamleader = await this.teamleaderRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return right({ teamleader });
  }
}
