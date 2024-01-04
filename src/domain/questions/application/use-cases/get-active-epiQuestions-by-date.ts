/* eslint-disable no-useless-constructor */
import { EpiQuestionRepository } from "../repositories/epiQuestion-repository";
import { EPIQuestion } from "../../enterprise/entities/epiQuestion";

interface GetEPIQuestionByDateInterfaceRequest {
  date: Date;
  page: number;
}

interface GetEPIQuestionByDateInterfaceResponse {
  epiquestion: Array<EPIQuestion>;
}

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

    return { epiquestion };
  }
}
