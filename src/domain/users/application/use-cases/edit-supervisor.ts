/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { Supervisor } from "../../enterprise/entities/supervisor";
import { SupervisorRepository } from "../repositories/supervisor-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditSupervisorInterfaceRequest {
  supervisorId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

type EditSupervisorInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { supervisor: Supervisor }
>;

export class EditSupervisor {
  constructor(private supervisorRepository: SupervisorRepository) {}

  async execute({
    supervisorId,
    programmerType,
    name,
    password,
    deactivation_date,
  }: EditSupervisorInterfaceRequest): Promise<EditSupervisorInterfaceResponse> {
    const supervisor = await this.supervisorRepository.findById(supervisorId);

    if (!supervisor) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    supervisor.name = name ?? supervisor.name;
    supervisor.password = password ?? supervisor.password;
    supervisor.deactivation_date =
      deactivation_date ?? supervisor.deactivation_date;

    await this.supervisorRepository.save(supervisor);

    return right({ supervisor });
  }
}
