/* eslint-disable no-useless-constructor */
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { APRRisk } from "../../enterprise/entities/aprRisk";

interface GetAprRiskByCategoryInterfaceRequest {
  category: string;
  page: number;
}

interface GetAprRiskByCategoryInterfaceResponse {
  aprrisk: Array<APRRisk>;
}

export class GetAprRiskByCategory {
  constructor(private aprriskRepository: AprRiskRepository) {}

  async execute({
    category,
    page,
  }: GetAprRiskByCategoryInterfaceRequest): Promise<GetAprRiskByCategoryInterfaceResponse> {
    const aprrisk = await this.aprriskRepository.findMany(
      { page },
      undefined,
      undefined,
      category
    );

    return { aprrisk };
  }
}
