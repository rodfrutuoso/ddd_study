/* eslint-disable no-useless-constructor */
import { TstRepository } from "../repositories/tst-repository";
import { Tst } from "../../enterprise/entities/tst";
import { Either, right } from "@/core/either";

interface GetTstByNameInterfaceRequest {
  name: string;
  page: number;
}

type GetTstByNameInterfaceResponse = Either<null, { tst: Array<Tst> }>;

export class GetTstByName {
  constructor(private tstRepository: TstRepository) {}

  async execute({
    name,
    page,
  }: GetTstByNameInterfaceRequest): Promise<GetTstByNameInterfaceResponse> {
    const tst = await this.tstRepository.findMany(
      { page },
      undefined,
      undefined,
      name
    );

    return right({ tst });
  }
}
