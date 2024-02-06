/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Coordinator } from "../../enterprise/entities/coordinator";
import { CoordinatorRepository } from "../repositories/coordinator-repository";
import { Either, left, right } from "@/core/either";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";

interface RegisterCoordinatorInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

type RegisterCoordinatorInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { coordinator: Coordinator }
>;

export class RegisterCoordinator {
  constructor(private coordinatorRepository: CoordinatorRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
  }: RegisterCoordinatorInterfaceRequest): Promise<RegisterCoordinatorInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.coordinatorRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.coordinatorRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

    const coordinator = Coordinator.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.coordinatorRepository.create(coordinator);

    return right({ coordinator });
  }
}
