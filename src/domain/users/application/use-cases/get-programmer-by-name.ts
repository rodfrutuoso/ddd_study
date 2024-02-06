/* eslint-disable no-useless-constructor */
import { ProgrammerRepository } from "../repositories/programmer-repository";
import { Programmer } from "../../enterprise/entities/programmer";
import { Either, right } from "@/core/either";

interface GetProgrammerByNameInterfaceRequest {
  name: string;
  page: number;
}

type GetProgrammerByNameInterfaceResponse = Either<
  null,
  { programmer: Array<Programmer> }
>;

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

    return right({ programmer });
  }
}
