/* eslint-disable no-useless-constructor */
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";

interface GetEPIQuestionByQuestionInterfaceRequest {
  question: string;
  page: number;
}

interface GetEPIQuestionByQuestionInterfaceResponse {
  epiquestion: Array<EPIQuestion>;
}

export class GetEPIQuestionByQuestion {
  constructor(private epiquestionRepository: EpiQuestionRepository) {}

  async execute({
    question,
    page,
  }: GetEPIQuestionByQuestionInterfaceRequest): Promise<GetEPIQuestionByQuestionInterfaceResponse> {
    const epiquestion = await this.epiquestionRepository.findMany(
      { page },
      undefined,
      question
    );

    return { epiquestion };
  }
}
