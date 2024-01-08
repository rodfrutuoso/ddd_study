/* eslint-disable no-useless-constructor */
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";

interface GetSMCQuestionByQuestionInterfaceRequest {
  question: string;
  page: number;
}

interface GetSMCQuestionByQuestionInterfaceResponse {
  smcquestion: Array<SMCQuestion>;
}

export class GetSMCQuestionByQuestion {
  constructor(private smcquestionRepository: SmcQuestionRepository) {}

  async execute({
    question,
    page,
  }: GetSMCQuestionByQuestionInterfaceRequest): Promise<GetSMCQuestionByQuestionInterfaceResponse> {
    const smcquestion = await this.smcquestionRepository.findMany(
      { page },
      undefined,
      question
    );

    return { smcquestion };
  }
}
