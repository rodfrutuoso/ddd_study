/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { APRMeasure } from "../../enterprise/entities/aprMeasure";
import { AprMeasureRepository } from "../repositories/aprMeasure-repository";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";

interface EditAprMeasureInterfaceRequest {
  questionId: string;
  programmerType: string;
}

type EditAprMeasureInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { aprMeasure: APRMeasure }
>;

export class EditAprMeasure {
  constructor(private aprMeasureRepository: AprMeasureRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditAprMeasureInterfaceRequest): Promise<EditAprMeasureInterfaceResponse> {
    const aprMeasure = await this.aprMeasureRepository.findById(questionId);

    if (!aprMeasure) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    aprMeasure.endDate = aprMeasure.endDate ?? new Date();

    await this.aprMeasureRepository.save(aprMeasure);

    return right({ aprMeasure });
  }
}
