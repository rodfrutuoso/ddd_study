/* eslint-disable no-useless-constructor */
import { SupervisorRepository } from "../repositories/supervisor-repository";
import { Supervisor } from "../../enterprise/entities/supervisor";

interface GetSupervisorByNameInterfaceRequest {
  name: string;
  page: number;
}

interface GetSupervisorByNameInterfaceResponse {
  supervisor: Array<Supervisor>;
}

export class GetSupervisorByName {
  constructor(private supervisorRepository: SupervisorRepository) {}

  async execute({
    name,
    page,
  }: GetSupervisorByNameInterfaceRequest): Promise<GetSupervisorByNameInterfaceResponse> {
    const supervisor = await this.supervisorRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return { supervisor };
  }
}
