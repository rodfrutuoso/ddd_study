/* eslint-disable no-useless-constructor */
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { APRRisk } from "../../enterprise/entities/aprRisk";

interface GetAprRiskByRiskInterfaceRequest {
  question: string;
  page: number;
}

interface GetAprRiskByRiskInterfaceResponse {
  aprrisk: Array<APRRisk>;
}

export class GetAprRiskByRisk {
  constructor(private aprriskRepository: AprRiskRepository) {}

  async execute({
    question,
    page,
  }: GetAprRiskByRiskInterfaceRequest): Promise<GetAprRiskByRiskInterfaceResponse> {
    const aprrisk = await this.aprriskRepository.findMany(
      { page },
      undefined,
      question
    );

    return { aprrisk };
  }
}
