/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Supervisor } from "../../enterprise/entities/supervisor";
import { SupervisorRepository } from "../repositories/supervisor-repository";

interface EditSupervisorInterfaceRequest {
  supervisorId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

interface EditSupervisorInterfaceResponse {
  supervisor: Supervisor;
}

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

    if (!supervisor) throw new Error("supervisor not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    supervisor.name = name ?? supervisor.name;
    supervisor.password = password ?? supervisor.password;
    supervisor.deactivation_date =
      deactivation_date ?? supervisor.deactivation_date;

    await this.supervisorRepository.save(supervisor);

    return { supervisor };
  }
}
