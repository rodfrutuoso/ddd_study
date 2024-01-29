/* eslint-disable no-useless-constructor */
import { CoordinatorRepository } from "../repositories/coordinator-repository";
import { Coordinator } from "../../enterprise/entities/coordinator";

interface GetCoordinatorByNameInterfaceRequest {
  name: string;
  page: number;
}

interface GetCoordinatorByNameInterfaceResponse {
  coordinator: Array<Coordinator>;
}

export class GetCoordinatorByName {
  constructor(private coordinatorRepository: CoordinatorRepository) {}

  async execute({
    name,
    page,
  }: GetCoordinatorByNameInterfaceRequest): Promise<GetCoordinatorByNameInterfaceResponse> {
    const coordinator = await this.coordinatorRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return { coordinator };
  }
}
