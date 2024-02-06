/* eslint-disable no-useless-constructor */
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";
import { Either, right } from "@/core/either";

interface GetSMCQuestionByQuestionInterfaceRequest {
  question: string;
  page: number;
}

type GetSMCQuestionByQuestionInterfaceResponse = Either<
  null,
  { smcquestion: Array<SMCQuestion> }
>;

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

    return right({ smcquestion });
  }
}
