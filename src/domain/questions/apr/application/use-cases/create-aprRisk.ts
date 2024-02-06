/* eslint-disable no-useless-constructor */
import { Either, right } from "@/core/either";
import { APRRisk } from "../../enterprise/entities/aprRisk";
import { AprRiskRepository } from "../repositories/aprRisk-repository";

interface CreateAprRiskInterfaceRequest {
  question: string;
  category: string;
}

type CreateAprRiskInterfaceResponse = Either<null, { aprRisk: APRRisk }>;

export class CreateAprRisk {
  constructor(private aprRiskRepository: AprRiskRepository) {}

  async execute({
    question,
    category,
  }: CreateAprRiskInterfaceRequest): Promise<CreateAprRiskInterfaceResponse> {
    const aprRisk = APRRisk.create({
      question,
      category,
    });

    await this.aprRiskRepository.create(aprRisk);

    return right({ aprRisk });
  }
}
