/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { Tst } from "../../enterprise/entities/tst";
import { TstRepository } from "../repositories/tst-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditTstInterfaceRequest {
  tstId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

type EditTstInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { tst: Tst }
>;

export class EditTst {
  constructor(private tstRepository: TstRepository) {}

  async execute({
    tstId,
    programmerType,
    name,
    password,
    deactivation_date,
  }: EditTstInterfaceRequest): Promise<EditTstInterfaceResponse> {
    const tst = await this.tstRepository.findById(tstId);

    if (!tst) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    tst.name = name ?? tst.name;
    tst.password = password ?? tst.password;
    tst.deactivation_date = deactivation_date ?? tst.deactivation_date;

    await this.tstRepository.save(tst);

    return right({ tst });
  }
}
