/* eslint-disable no-useless-constructor */
import { APRMeasure } from "../../enterprise/entities/aprMeasure";
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";

interface EditAprMeasureInterfaceRequest {
  questionId: string;
  programmerType: string;
}

interface EditAprMeasureInterfaceResponse {
  aprMeasure: APRMeasure;
}

export class EditAprMeasure {
  constructor(private aprMeasureRepository: AprMeasureRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditAprMeasureInterfaceRequest): Promise<EditAprMeasureInterfaceResponse> {
    const aprMeasure = await this.aprMeasureRepository.findById(questionId);

    if (!aprMeasure) throw new Error("EPI Question not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    aprMeasure.endDate = aprMeasure.endDate ?? new Date();

    await this.aprMeasureRepository.save(aprMeasure);

    return { aprMeasure };
  }
}
