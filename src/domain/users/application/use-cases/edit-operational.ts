/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { Operational } from "../../enterprise/entities/operational";
import { OperationalRepository } from "../repositories/operational-repository";
import { Either, left, right } from "@/core/either";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditOperationalInterfaceRequest {
  operationalId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

type EditOperationalInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { operational: Operational }
>;

export class EditOperational {
  constructor(private operationalRepository: OperationalRepository) {}

  async execute({
    operationalId,
    programmerType,
    name,
    password,
    deactivation_date,
  }: EditOperationalInterfaceRequest): Promise<EditOperationalInterfaceResponse> {
    const operational =
      await this.operationalRepository.findById(operationalId);

    if (!operational) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    operational.name = name ?? operational.name;
    operational.password = password ?? operational.password;
    operational.deactivation_date =
      deactivation_date ?? operational.deactivation_date;

    await this.operationalRepository.save(operational);

    return right({ operational });
  }
}
