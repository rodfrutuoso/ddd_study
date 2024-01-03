/* eslint-disable no-useless-constructor */
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";

interface GetSMCQuestionByDateInterfaceRequest {
  date: Date;
  page: number;
}

interface GetSMCQuestionByDateInterfaceResponse {
  smcquestion: Array<SMCQuestion>;
}

export class GetSMCQuestionByDate {
  constructor(private smcquestionRepository: SmcQuestionRepository) {}

  async execute({
    date,
    page,
  }: GetSMCQuestionByDateInterfaceRequest): Promise<GetSMCQuestionByDateInterfaceResponse> {
    const smcquestion = await this.smcquestionRepository.findMany(
      { page },
      date
    );

    return { smcquestion };
  }
}
