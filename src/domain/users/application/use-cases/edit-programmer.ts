/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";
import { Programmer } from "../../enterprise/entities/programmer";
import { ProgrammerRepository } from "../repositories/programmer-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { Either, left, right } from "@/core/either";

interface EditProgrammerInterfaceRequest {
  programmerId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

type EditProgrammerInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { programmer: Programmer }
>;

export class EditProgrammer {
  constructor(private programmerRepository: ProgrammerRepository) {}

  async execute({
    programmerId,
    programmerType,
    name,
    password,
    deactivation_date,
  }: EditProgrammerInterfaceRequest): Promise<EditProgrammerInterfaceResponse> {
    const programmer = await this.programmerRepository.findById(programmerId);

    if (!programmer) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    programmer.name = name ?? programmer.name;
    programmer.password = password ?? programmer.password;
    programmer.deactivation_date =
      deactivation_date ?? programmer.deactivation_date;

    await this.programmerRepository.save(programmer);

    return right({ programmer });
  }
}
