/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Request } from "../../enterprise/entities/request";
import { RequestRepository } from "../repositories/request-repository";
import { Either, left, right } from "@/core/either";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";

interface RegisterRequestInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
  teamId?: string;
}

type RegisterRequestInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { request: Request }
>;

export class RegisterRequest {
  constructor(private requestRepository: RequestRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
  }: RegisterRequestInterfaceRequest): Promise<RegisterRequestInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.requestRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.requestRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

    const request = Request.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.requestRepository.create(request);

    return right({ request });
  }
}
