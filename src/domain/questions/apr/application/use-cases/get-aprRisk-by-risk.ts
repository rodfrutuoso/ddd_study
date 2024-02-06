/* eslint-disable no-useless-constructor */
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { APRRisk } from "../../enterprise/entities/aprRisk";
import { Either, right } from "@/core/either";

interface GetAprRiskByRiskInterfaceRequest {
  question: string;
  page: number;
}

type GetAprRiskByRiskInterfaceResponse = Either<
  null,
  { aprrisk: Array<APRRisk> }
>;

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

    return right({ aprrisk });
  }
}
