/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Operational } from "../../enterprise/entities/operational";
import { OperationalRepository } from "../repositories/operational-repository";

interface EditOperationalInterfaceRequest {
  operationalId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

interface EditOperationalInterfaceResponse {
  operational: Operational;
}

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

    if (!operational) throw new Error("operational not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    operational.name = name ?? operational.name;
    operational.password = password ?? operational.password;
    operational.deactivation_date =
      deactivation_date ?? operational.deactivation_date;

    await this.operationalRepository.save(operational);

    return { operational };
  }
}
