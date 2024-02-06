/* eslint-disable no-useless-constructor */
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";
import { APRMeasure } from "../../enterprise/entities/aprMeasure";
import { Either, right } from "@/core/either";

interface GetAprMeasureByMeasureInterfaceRequest {
  response: string;
  page: number;
}

type GetAprMeasureByMeasureInterfaceResponse = Either<
  null,
  { aprmeasure: Array<APRMeasure> }
>;

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

    return right({ aprmeasure });
  }
}
