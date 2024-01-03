/* eslint-disable no-useless-constructor */
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";

interface CreateSmcQuestionInterfaceRequest {
  question: string;
}

interface CreateSmcQuestionInterfaceResponse {
  smcQuestion: SMCQuestion;
}

export class CreateSmcQuestion {
  constructor(private smcQuestionRepository: SmcQuestionRepository) {}

  async execute({
    question,
  }: CreateSmcQuestionInterfaceRequest): Promise<CreateSmcQuestionInterfaceResponse> {
    const smcQuestion = SMCQuestion.create({
      question,
    });

    await this.smcQuestionRepository.create(smcQuestion);

    return { smcQuestion };
  }
}
