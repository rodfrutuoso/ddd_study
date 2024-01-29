/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Coordinator } from "../../enterprise/entities/coordinator";
import { CoordinatorRepository } from "../repositories/coordinator-repository";

interface RegisterCoordinatorInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

interface RegisterCoordinatorInterfaceResponse {
  coordinator: Coordinator;
}

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
      throw new Error("O email precisa ser do domínio da Ecoelétrica");

    const verifyEmail = await this.coordinatorRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.coordinatorRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) throw new Error("E-mail já cadastrado");
    if (verifyCpf.length !== 0) throw new Error("CPF já cadastrado");

    const coordinator = Coordinator.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.coordinatorRepository.create(coordinator);

    return { coordinator };
  }
}
