/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Request } from "../../enterprise/entities/request";
import { RequestRepository } from "../repositories/request-repository";

interface RegisterRequestInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
  teamId?: string;
}

interface RegisterRequestInterfaceResponse {
  request: Request;
}

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
      throw new Error("O email precisa ser do domínio da Ecoelétrica");

    const verifyEmail = await this.requestRepository.findMany(
      { page: 1 },
      email
    );
    const verifyCpf = await this.requestRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) throw new Error("E-mail já cadastrado");
    if (verifyCpf.length !== 0) throw new Error("CPF já cadastrado");

    const request = Request.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.requestRepository.create(request);

    return { request };
  }
}
