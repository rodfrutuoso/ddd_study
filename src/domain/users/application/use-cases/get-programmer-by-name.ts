/* eslint-disable no-useless-constructor */
import { ProgrammerRepository } from "../repositories/programmer-repository";
import { Programmer } from "../../enterprise/entities/programmer";

interface GetProgrammerByNameInterfaceRequest {
  name: string;
  page: number;
}

interface GetProgrammerByNameInterfaceResponse {
  programmer: Array<Programmer>;
}

export class GetProgrammerByName {
  constructor(private programmerRepository: ProgrammerRepository) {}

  async execute({
    name,
    page,
  }: GetProgrammerByNameInterfaceRequest): Promise<GetProgrammerByNameInterfaceResponse> {
    const programmer = await this.programmerRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return { programmer };
  }
}
