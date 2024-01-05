/* eslint-disable no-useless-constructor */
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";
import { APRMeasure } from "../../enterprise/entities/aprMeasure";

interface GetAprMeasureByCategoryInterfaceRequest {
  category: string;
  page: number;
}

interface GetAprMeasureByCategoryInterfaceResponse {
  aprmeasure: Array<APRMeasure>;
}

export class GetAprMeasureByCategory {
  constructor(private aprmeasureRepository: AprMeasureRepository) {}

  async execute({
    category,
    page,
  }: GetAprMeasureByCategoryInterfaceRequest): Promise<GetAprMeasureByCategoryInterfaceResponse> {
    const aprmeasure = await this.aprmeasureRepository.findMany(
      { page },
      undefined,
      undefined,
      category
    );

    return { aprmeasure };
  }
}
