/* eslint-disable no-useless-constructor */
import { APRRisk } from "../../enterprise/entities/aprRisk";
import { AprRiskRepository } from "../repositories/aprRisk-repository";

interface EditAprRiskInterfaceRequest {
  questionId: string;
  programmerType: string;
}

interface EditAprRiskInterfaceResponse {
  aprRisk: APRRisk;
}

export class EditAprRisk {
  constructor(private aprRiskRepository: AprRiskRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditAprRiskInterfaceRequest): Promise<EditAprRiskInterfaceResponse> {
    const aprRisk = await this.aprRiskRepository.findById(questionId);

    if (!aprRisk) throw new Error("EPI Question not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    aprRisk.endDate = aprRisk.endDate ?? new Date();

    await this.aprRiskRepository.save(aprRisk);

    return { aprRisk };
  }
}
