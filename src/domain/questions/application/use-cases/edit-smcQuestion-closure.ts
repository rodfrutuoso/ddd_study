/* eslint-disable no-useless-constructor */
import { SMCQuestion } from "../../enterprise/entities/smcQuestion";
import { SmcQuestionRepository } from "../repositories/smcQuestion-repository";

interface EditSmcQuestionInterfaceRequest {
  questionId: string;
  programmerType: string;
}

interface EditSmcQuestionInterfaceResponse {
  smcQuestion: SMCQuestion;
}

export class EditSmcQuestion {
  constructor(private smcQuestionRepository: SmcQuestionRepository) {}

  async execute({
    questionId,
    programmerType,
  }: EditSmcQuestionInterfaceRequest): Promise<EditSmcQuestionInterfaceResponse> {
    const smcQuestion = await this.smcQuestionRepository.findById(questionId);

    if (!smcQuestion) throw new Error("SMC Question not found");

    if (programmerType !== "ADM" && programmerType !== "PROGRAMAÇÃO")
      throw new Error("Not authorized");

    smcQuestion.endDate = smcQuestion.endDate ?? new Date();

    await this.smcQuestionRepository.save(smcQuestion);

    return { smcQuestion };
  }
}
