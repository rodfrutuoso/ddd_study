/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Tst } from "../../enterprise/entities/tst";
import { TstRepository } from "../repositories/tst-repository";
import { Either, left, right } from "@/core/either";
import { EmailAlreadyRegistered } from "@/domain/errors/email-already-registered";
import { EmailNotEcoeletrica } from "@/domain/errors/email-not-ecoeletrica";
import { CpfAlreadyRegistered } from "@/domain/errors/cpf-already-registered";

interface RegisterTstInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

type RegisterTstInterfaceResponse = Either<
  EmailAlreadyRegistered | EmailNotEcoeletrica | CpfAlreadyRegistered,
  { tst: Tst }
>;

export class RegisterTst {
  constructor(private tstRepository: TstRepository) {}

  async execute({
    name,
    cpf,
    email,
    password,
    type,
    created_by,
  }: RegisterTstInterfaceRequest): Promise<RegisterTstInterfaceResponse> {
    if (!email?.includes("@ecoeletrica.com.br"))
      return left(new EmailNotEcoeletrica());

    const verifyEmail = await this.tstRepository.findMany({ page: 1 }, email);
    const verifyCpf = await this.tstRepository.findMany(
      { page: 1 },
      undefined,
      cpf
    );

    if (verifyEmail.length !== 0) return left(new EmailAlreadyRegistered());
    if (verifyCpf.length !== 0) return left(new CpfAlreadyRegistered());

    const tst = Tst.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.tstRepository.create(tst);

    return right({ tst });
  }
}
