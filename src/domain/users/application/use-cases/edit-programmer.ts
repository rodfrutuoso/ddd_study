/* eslint-disable camelcase */
/* eslint-disable no-useless-constructor */
import { Programmer } from "../../enterprise/entities/programmer";
import { ProgrammerRepository } from "../repositories/programmer-repository";

interface EditProgrammerInterfaceRequest {
  programmerId: string;
  programmerType: string;
  name?: string;
  password?: string;
  deactivation_date?: Date;
}

interface EditProgrammerInterfaceResponse {
  programmer: Programmer;
}

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

    if (!programmer) throw new Error("programmer not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    programmer.name = name ?? programmer.name;
    programmer.password = password ?? programmer.password;
    programmer.deactivation_date =
      deactivation_date ?? programmer.deactivation_date;

    await this.programmerRepository.save(programmer);

    return { programmer };
  }
}
