/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { TeamLeader } from "../../enterprise/entities/teamLeader";
import { TeamLeaderRepository } from "../repositories/teamLeader-repository";
import { Either, left, right } from "@/core/either";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";

interface RegisterTeamLeaderInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
  teamId: string;
}

type RegisterTeamLeaderInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { teamleader: TeamLeader }
>;

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
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.teamleaderRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.teamleaderRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

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

    return right({ teamleader });
  }
}
