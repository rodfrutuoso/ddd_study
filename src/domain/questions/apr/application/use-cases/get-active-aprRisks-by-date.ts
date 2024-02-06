/* eslint-disable no-useless-constructor */
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { APRRisk } from "../../enterprise/entities/aprRisk";
import { Either, right } from "@/core/either";

interface GetAprRiskByDateInterfaceRequest {
  date: Date;
  page: number;
}

type GetAprRiskByDateInterfaceResponse = Either<
  null,
  { aprrisk: Array<APRRisk> }
>;

export class GetAprRiskByDate {
  constructor(private aprRiskRepository: AprRiskRepository) {}

  async execute({
    date,
    page,
  }: GetAprRiskByDateInterfaceRequest): Promise<GetAprRiskByDateInterfaceResponse> {
    const aprrisk = await this.aprRiskRepository.findMany({ page }, date);

    return right({ aprrisk });
  }
}
