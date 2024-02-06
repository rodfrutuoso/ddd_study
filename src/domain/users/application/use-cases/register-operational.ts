/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Operational } from "../../enterprise/entities/operational";
import { OperationalRepository } from "../repositories/operational-repository";
import { Either, left, right } from "@/core/either";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";

interface RegisterOperationalInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
  teamId: string;
}

type RegisterOperationalInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { operational: Operational }
>;

export class RegisterOperational {
  constructor(private operationalRepository: OperationalRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
    teamId,
  }: RegisterOperationalInterfaceRequest): Promise<RegisterOperationalInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.operationalRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.operationalRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

    const operational = Operational.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
      teamId: new UniqueEntityId(teamId),
    });

    await this.operationalRepository.create(operational);

    return right({ operational });
  }
}
