/* eslint-disable no-useless-constructor */
import { OperationalRepository } from "../repositories/operational-repository";
import { Operational } from "../../enterprise/entities/operational";
import { Either, right } from "@/core/either";

interface GetOperationalByNameInterfaceRequest {
  name: string;
  page: number;
}

type GetOperationalByNameInterfaceResponse = Either<
  null,
  { operational: Array<Operational> }
>;

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

    return right({ operational });
  }
}
