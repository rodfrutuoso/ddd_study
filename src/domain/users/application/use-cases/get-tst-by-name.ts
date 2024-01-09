/* eslint-disable no-useless-constructor */
import { TstRepository } from "../repositories/tst-repository";
import { Tst } from "../../enterprise/entities/tst";

interface GetTstByNameInterfaceRequest {
  name: string;
  page: number;
}

interface GetTstByNameInterfaceResponse {
  tst: Array<Tst>;
}

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

    return { tst };
  }
}
