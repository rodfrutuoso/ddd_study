/* eslint-disable no-useless-constructor */
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { APRRisk } from "../../enterprise/entities/aprRisk";
import { Either, right } from "@/core/either";

interface GetAprRiskByCategoryInterfaceRequest {
  category: string;
  page: number;
}

type GetAprRiskByCategoryInterfaceResponse = Either<
  null,
  { aprrisk: Array<APRRisk> }
>;

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

    return right({ aprrisk });
  }
}
