/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Supervisor } from "../../enterprise/entities/supervisor";
import { SupervisorRepository } from "../repositories/supervisor-repository";
import { Either, left, right } from "@/core/either";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";

interface RegisterSupervisorInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

type RegisterSupervisorInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { supervisor: Supervisor }
>;

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
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.supervisorRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.supervisorRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

    const supervisor = Supervisor.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.supervisorRepository.create(supervisor);

    return right({ supervisor });
  }
}
