/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Supervisor } from "../../enterprise/entities/supervisor";
import { SupervisorRepository } from "../repositories/supervisor-repository";

interface RegisterSupervisorInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

interface RegisterSupervisorInterfaceResponse {
  supervisor: Supervisor;
}

export class RegisterSupervisor {
  constructor(private supervisorRepository: SupervisorRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
  }: RegisterSupervisorInterfaceRequest): Promise<RegisterSupervisorInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      throw new Error("O email precisa ser do domínio da Ecoelétrica");

    const verifyEmail = await this.supervisorRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.supervisorRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) throw new Error("E-mail já cadastrado");
    if (verifyCpf.length !== 0) throw new Error("CPF já cadastrado");

    const supervisor = Supervisor.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.supervisorRepository.create(supervisor);

    return { supervisor };
  }
}
