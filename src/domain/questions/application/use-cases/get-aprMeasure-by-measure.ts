/* eslint-disable no-useless-constructor */
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";
import { APRMeasure } from "../../enterprise/entities/aprMeasure";

interface GetAprMeasureByMeasureInterfaceRequest {
  response: string;
  page: number;
}

interface GetAprMeasureByMeasureInterfaceResponse {
  aprmeasure: Array<APRMeasure>;
}

export class GetAprMeasureByMeasure {
  constructor(private aprmeasureRepository: AprMeasureRepository) {}

  async execute({
    response,
    page,
  }: GetAprMeasureByMeasureInterfaceRequest): Promise<GetAprMeasureByMeasureInterfaceResponse> {
    const aprmeasure = await this.aprmeasureRepository.findMany(
      { page },
      undefined,
      response
    );

    return { aprmeasure };
  }
}
