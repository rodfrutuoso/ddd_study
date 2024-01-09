/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Tst } from "../../enterprise/entities/tst";
import { TstRepository } from "../repositories/tst-repository";

interface RegisterTstInterfaceRequest {
  name: string;
  cpf: number;
  email?: string;
  password: string;
  type: string;
  created_by: string;
}

interface RegisterTstInterfaceResponse {
  tst: Tst;
}

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
    const tst = Tst.create({
      name,
      cpf,
      email,
      password,
      type,
      created_by: new UniqueEntityId(created_by),
    });

    await this.tstRepository.create(tst);

    return { tst };
  }
}
