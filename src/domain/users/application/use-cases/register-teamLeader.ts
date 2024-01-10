/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { TeamLeader } from "../../enterprise/entities/teamLeader";
import { TeamLeaderRepository } from "../repositories/teamLeader-repository";

interface RegisterTeamLeaderInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
  teamId: string;
}

interface RegisterTeamLeaderInterfaceResponse {
  teamleader: TeamLeader;
}

export class RegisterTeamLeader {
  constructor(private teamleaderRepository: TeamLeaderRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
    teamId,
  }: RegisterTeamLeaderInterfaceRequest): Promise<RegisterTeamLeaderInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      throw new Error("O email precisa ser do domínio da Ecoelétrica");

    const verifyEmail = await this.teamleaderRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.teamleaderRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) throw new Error("E-mail já cadastrado");
    if (verifyCpf.length !== 0) throw new Error("CPF já cadastrado");

    const teamleader = TeamLeader.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
      teamId: new UniqueEntityId(teamId),
    });

    await this.teamleaderRepository.create(teamleader);

    return { teamleader };
  }
}
