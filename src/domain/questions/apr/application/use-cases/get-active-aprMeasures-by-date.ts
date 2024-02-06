/* eslint-disable no-useless-constructor */
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";
import { APRMeasure } from "../../enterprise/entities/aprMeasure";
import { Either, right } from "@/core/either";

interface GetAprMeasureByDateInterfaceRequest {
  date: Date;
  page: number;
}

type GetAprMeasureByDateInterfaceResponse = Either<
  null,
  { aprmeasure: Array<APRMeasure> }
>;

export class GetAprMeasureByDate {
  constructor(private aprMeasureRepository: AprMeasureRepository) {}

  async execute({
    date,
    page,
  }: GetAprMeasureByDateInterfaceRequest): Promise<GetAprMeasureByDateInterfaceResponse> {
    const aprmeasure = await this.aprMeasureRepository.findMany({ page }, date);

    return right({ aprmeasure });
  }
}
