/* eslint-disable no-useless-constructor */
import { OperationalRepository } from "../repositories/operational-repository";
import { Operational } from "../../enterprise/entities/operational";

interface GetOperationalByNameInterfaceRequest {
  name: string;
  page: number;
}

interface GetOperationalByNameInterfaceResponse {
  operational: Array<Operational>;
}

export class GetOperationalByName {
  constructor(private operationalRepository: OperationalRepository) {}

  async execute({
    name,
    page,
  }: GetOperationalByNameInterfaceRequest): Promise<GetOperationalByNameInterfaceResponse> {
    const operational = await this.operationalRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return { operational };
  }
}
