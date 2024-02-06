/* eslint-disable no-useless-constructor */
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";
import { Either, right } from "@/core/either";

interface GetSMCQuestionByDateInterfaceRequest {
  date: Date;
  page: number;
}

type GetSMCQuestionByDateInterfaceResponse = Either<
  null,
  { smcquestion: Array<SMCQuestion> }
>;

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

    return right({ smcquestion });
  }
}
