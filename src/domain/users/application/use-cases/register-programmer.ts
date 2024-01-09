/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Programmer } from "../../enterprise/entities/programmer";
import { ProgrammerRepository } from "../repositories/programmer-repository";

interface RegisterProgrammerInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

interface RegisterProgrammerInterfaceResponse {
  programmer: Programmer;
}

export class RegisterProgrammer {
  constructor(private programmerRepository: ProgrammerRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
  }: RegisterProgrammerInterfaceRequest): Promise<RegisterProgrammerInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      throw new Error("O email precisa ser do domínio da Ecoelétrica");

    const verifyEmail = await this.programmerRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.programmerRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) throw new Error("E-mail já cadastrado");
    if (verifyCpf.length !== 0) throw new Error("CPF já cadastrado");

    const programmer = Programmer.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.programmerRepository.create(programmer);

    return { programmer };
  }
}
