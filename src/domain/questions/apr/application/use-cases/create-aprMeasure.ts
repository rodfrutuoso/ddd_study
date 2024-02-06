/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { APRMeasure } from "../../enterprise/entities/aprMeasure";
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";

interface CreateAprMeasureInterfaceRequest {
  response: string;
  category: string;
}

type CreateAprMeasureInterfaceResponse = Either<
  null,
  { aprMeasure: APRMeasure }
>;

export class CreateAprMeasure {
  constructor(private aprMeasureRepository: AprMeasureRepository) {}

  async execute({
    response,
    category,
  }: CreateAprMeasureInterfaceRequest): Promise<CreateAprMeasureInterfaceResponse> {
    const aprMeasure = APRMeasure.create({
      response,
      category,
    });

    await this.aprMeasureRepository.create(aprMeasure);

    return right({ aprMeasure });
  }
}
