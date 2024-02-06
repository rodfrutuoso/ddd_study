/* eslint-disable no-useless-constructor */
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";
import { Either, right } from "@/core/either";

interface GetEPIQuestionByDateInterfaceRequest {
  date: Date;
  page: number;
}

type GetEPIQuestionByDateInterfaceResponse = Either<
  null,
  { epiquestion: Array<EPIQuestion> }
>;

export class GetEPIQuestionByDate {
  constructor(private epiQuestionRepository: EpiQuestionRepository) {}

  async execute({
    date,
    page,
  }: GetEPIQuestionByDateInterfaceRequest): Promise<GetEPIQuestionByDateInterfaceResponse> {
    const epiquestion = await this.epiQuestionRepository.findMany(
      { page },
      date
    );

    return right({ epiquestion });
  }
}
