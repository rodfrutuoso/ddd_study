/* eslint-disable no-useless-constructor */
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";
import { Either, right } from "@/core/either";

interface GetEPIQuestionByQuestionInterfaceRequest {
  question: string;
  page: number;
}

type GetEPIQuestionByQuestionInterfaceResponse = Either<
  null,
  { epiquestion: Array<EPIQuestion> }
>;

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

    return right({ epiquestion });
  }
}
