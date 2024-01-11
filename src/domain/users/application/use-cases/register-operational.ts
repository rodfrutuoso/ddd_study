/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Operational } from "../../enterprise/entities/operational";
import { OperationalRepository } from "../repositories/operational-repository";

interface RegisterOperationalInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
  teamId: string;
}

interface RegisterOperationalInterfaceResponse {
  operational: Operational;
}

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
      throw new Error("O email precisa ser do domínio da Ecoelétrica");

    const verifyEmail = await this.operationalRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.operationalRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) throw new Error("E-mail já cadastrado");
    if (verifyCpf.length !== 0) throw new Error("CPF já cadastrado");

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

    return { operational };
  }
}
