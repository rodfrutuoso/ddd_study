/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Programmer } from "../../enterprise/entities/programmer";
import { ProgrammerRepository } from "../repositories/programmer-repository";
import { Either, left, right } from "@/core/either";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";

interface RegisterProgrammerInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

type RegisterProgrammerInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { programmer: Programmer }
>;

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
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.programmerRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.programmerRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

    const programmer = Programmer.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.programmerRepository.create(programmer);

    return right({ programmer });
  }
}
