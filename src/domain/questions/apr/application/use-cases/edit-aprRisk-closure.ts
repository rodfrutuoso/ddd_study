/* eslint-disable no-useless-constructor */
import { Either, left, right } from "@/core/either";
import { APRRisk } from "../../enterprise/entities/aprRisk";
import { AprRiskRepository } from "../repositories/aprRisk-repository";
import { NotAuthorizedError } from "@/domain/errors/not-authorized-error";
import { ResourceNotFoundError } from "@/domain/errors/resource-not-found-error";

interface EditAprRiskInterfaceRequest {
  questionId: string;
  programmerType: string;
}

type EditAprRiskInterfaceResponse = Either<
  ResourceNotFoundError | NotAuthorizedError,
  { aprRisk: APRRisk }
>;

export class EditAprRisk {
  constructor(private aprRiskRepository: AprRiskRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditAprRiskInterfaceRequest): Promise<EditAprRiskInterfaceResponse> {
    const aprRisk = await this.aprRiskRepository.findById(questionId);

    if (!aprRisk) return left(new ResourceNotFoundError());

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      return left(new NotAuthorizedError());

    aprRisk.endDate = aprRisk.endDate ?? new Date();

    await this.aprRiskRepository.save(aprRisk);

    return right({ aprRisk });
  }
}
