/* eslint-disable no-useless-constructor */
import { APRMeasure } from "../../enterprise/entities/aprMeasure";
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";

interface CreateAprMeasureInterfaceRequest {
  response: string;
  category: string;
}

interface CreateAprMeasureInterfaceResponse {
  aprMeasure: APRMeasure;
}

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

    return { aprMeasure };
  }
}
